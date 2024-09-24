const { User, Chat, ChatMessage } = require("../Models/index");
const sequelize = require("../config/database");

/**
 * update message status: Emit to update the message status to "read" for all participants in the room.
 * @param {String} roomId - The ID of the chat room where the message was read.
 * @param {Object} mes - The message that was updated to "read"(senderId, receiverId, chatId, message, status).
 */


/**
 * receive message: Broadcast a message to the chat room to notify all participants about a new message.
 * @param {Object} chat - The chat object containing message details(senderId, receiverId, chatId, message, status).
 */

/**
 * message sent: Emit to the sender to confirm that the message was sent successfully.
 * @param {Object} chat - The chat object containing message details(senderId, receiverId, chatId, message, status).
 */

/**
 * new chat: Emit to the recipient to notify them about the creation of a new chat.
 * @param {String} chatId - The ID of the new chat.
 * @param {Object} chat - The chat object containing initial message details(senderId, receiverId, chatId, message, status).
 */


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
    const chatexists = async (chatId, receiverId, senderId) => {

        try {
            const chat = await Chat.findByPk(chatId);
            if (!chat) {
                return null;
            }
            const participants = await chat.getParticipants();
            const areBothParticipants = [senderId, receiverId].every(id => 
                participants.some(participant => participant.id === id)
            );
            if (areBothParticipants) {
                return chat;
            } else {
                throw new Error("chat id is wrong");
            }
        } catch (err) {
            throw new Error(err)
        }
    };

    const exists = await chatexists(roomId, senderId, receiverId);
    exports.roomexists = exists;

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
};
