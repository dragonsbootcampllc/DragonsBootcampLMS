const { User, Chat, ChatMessage } = require("../Models/index");
const sequelize = require("../config/database");

/**
 * saveMessage - handle saving the chat, chat messages, and participants
 * @param {Object} data 
 * @returns {Object}
 */
const saveMessage = async (data) => {
  const { senderId, chatId, receiver, exists} = data;
  const transaction = await sequelize.transaction(); // Transaction for safety

  try {
    let newChat = exists;
    if (!newChat) {
      newChat = await Chat.create({}, { transaction });
      data.chatId = newChat.id;
    }

    const sender = await User.findByPk(senderId, { transaction });
    if (!sender || !receiver) {
      throw new Error('Invalid sender or receiver');
    }

    await newChat.addParticipants([sender, receiver], { transaction });
    const newMessage = await ChatMessage.create(data, { transaction });
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
    /**
     * 
     * @param {Integer} chatId 
     * @returns {Object}
     */
    const chatexists = async (chatId) => {
      const chat = await Chat.findByPk(chatId);
      return chat ? chat : null;
    };

    const exists = await chatexists(roomId);
    exports.roomexists = exists;

    if (receiver && receiver.socketId) {
      const chatId = roomId;
      const chat = await saveMessage({
        exists, //the chat object, i passed to avoid redundant checks
        receiver,
        senderId,
        receiverId,
        chatId,
        message
      });

      if (exists) {
        await readMessage(io, socket, senderId, chat.chatId);

        socket.broadcast.to(chat.chatId).emit("receive message", { chat });
        socket.emit("message sent", { chat });
      } else {
        socket.to(receiver.socketId).emit("new chat", { chatId: chat.chatId });
        socket.to(chat.chatId).emit("receive message", { chat });
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

        socket.broadcast.to(chat.chatId).emit("receive message", { chat }); //? i think this is not nessacary because the receiver is already offline so he went get the message
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
};
