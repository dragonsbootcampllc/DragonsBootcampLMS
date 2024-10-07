const { User, Chat, ChatMessage } = require("../Models/index");
const sequelize = require("../config/database");
const {Op} = require('sequelize');


const saveMessage = async (data) => {
  const { senderId, receiver, exists} = data;
  const transaction = await sequelize.transaction(); // Transaction for safety
  const sender = await User.findByPk(senderId, { transaction });

  if (!sender || !receiver) {
    throw new Error('Invalid sender or receiver');
  }

  try {
    let newChat = exists;
    if (!newChat) {
      newChat = await Chat.create({}, { transaction });
      await newChat.addParticipants([sender, receiver], { transaction });
    }

    const newMessage = await ChatMessage.create({
        senderId,
        receiverId: receiver.id,
        chatId: newChat.id,
        message: data.message,
        status: data.status
    },
    { transaction });
    await transaction.commit();
    return newMessage;
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};

/**
 * readMessage - Function to mark messages as "read"
 * @param {Object} io 
 * @param {Object} socket 
 * @param {String} userId 
 * @param {String} roomId 
 */
const readMessage = async (io, socket, userId, roomId) => {
  try {
    const messages = await ChatMessage.findAll({ where: { chatId: roomId, receiverId: userId, status: "deliverd" } });
    messages.forEach(async (mes) => {
      await ChatMessage.update({ status: "read" }, { where: { id: mes.dataValues.id, status: "deliverd" } });
      io.to(roomId).emit("update message status", { status: "read", mes });
    });
  } catch (err) {
    socket.emit("update message status", err.message);
    console.log(err.message);
  }
};

/** 
* @param {Integer} chatId 
* @returns {Object}
*/
const chatexists = async (receiverId, senderId) => {
   try {
       const chat = await Chat.findOne({
           include: [
               {
                   model: User,
                   as: 'participants',
                   attributes: [], // Exclude participant attributes if not needed
                   through: {
                       attributes: []
                   },
                   where: {
                       id: [senderId, receiverId]
                   }
               }
           ],
           where: {
               id: {
                   [Op.in]: sequelize.literal(`
                       (
                           SELECT "chat_id"
                           FROM "participant"
                           WHERE "user_id" IN (${senderId}, ${receiverId})
                           GROUP BY "chat_id"
                           HAVING COUNT(DISTINCT "user_id") = 2
                       )
                   `)
               }
           }
         });
       return chat ? chat : null;
   } catch (err) {
       throw new Error(err)
   }
};

/**
 * privatemessaging - function for the logic of the socket event (private message)
 * @param {Object} io 
 * @param {Object} socket 
 * @param {Object} data 
 */
const privatemessaging = async (io, socket, data) => {
  const { senderId, receiverId, roomId, message } = data;

   /**
     * checkConnection - micro function to check if the socket exists and connected 
     * @param {*} socketId 
     * @returns {Boolean}
     */
    // const checkConnection = (socketId) => {
    //     const socket = io.sockets.sockets.get(socketId);
    //     return socket ? socket.connected : false;
    // }
  try {
    const receiver = await User.findByPk(receiverId);
    const exists = await chatexists(senderId, receiverId);

    if (receiver && receiver.socketId) {
      const chatId = roomId;
      const chat = await saveMessage({
        exists, //the chat object, i passed to avoid redundant checks
        receiver,
        senderId,
        receiverId,
        chatId,
        message,
        status: "deliverd"
      });

      if (exists) {
        await readMessage(io, socket, senderId, chat.chatId);

        socket.broadcast.to(chat.chatId).emit("receive message", { chat });
        socket.emit("message sent", { chat });
      } else {
        socket.join(chat.chatId);
        socket.to(receiver.socketId).emit("new chat", { chatId: chat.chatId, chat });
        // socket.to(chat.chatId).emit("receive message", { chat });
        socket.emit("message sent", { chat });
      }
    } else {
      const chat = await saveMessage({
        exists,
        receiver,
        senderId,
        receiverId,
        chatId: roomId,
        message,
        status: "pending"
      });

      if (exists) {
        await readMessage(io, socket, senderId, chat.chatId);

        socket.emit("message sent", { chat });
      } else {
        socket.emit("message sent", { chat });
      }
    }
  } catch (err) {
    socket.emit("message sent", err.message);
    console.error(err);
  }
};

/**
 * joinRoom - Function to join all chats a user is part of
 * @param {String} userId 
 * @param {Object} socket 
 */
const joinRoom = async (userId, socket) => {
  try {
    const user = await User.findByPk(userId.id);
    const chats = await user.getChats();

    chats.forEach(chat => {
      socket.join(chat.id);
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  privatemessaging,
  joinRoom,
  readMessage,
  chatexists
};