const { where } = require("sequelize");
const {User, Chat, ChatMessage} = require("../Models/index");
const sequelize = require("../config/database")

/**
 * saveMessage - handle saving the chat and chat messages and participants in the database and handle the relationships between them
 * 
 * @param {Object} data 
 * @returns {Object}
 */
const saveMessage = async (data) => {
    const { senderId, chatId, receiver } = data;
    const transaction = await sequelize.transaction(); // i used transaction to avoid changing anything in the database of all the operations didn't succeed

    try {
        let newChat = await Chat.findByPk(chatId, { transaction });
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
        return newMessage
    } catch (error) {
        await transaction.rollback();
        throw new Error(error);
    }
};

/**
 * privatemessaging - function for the logic of the socket event(private message)
 * 
 * @param {Object} io 
 * @param {Object} socket 
 * @param {Object} data 
 */
exports.privatemessaging = async (io, socket, data) => {
    const {senderId, receiverId, roomId, message} = data;

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
      if (receiver && receiver.socketId) {
        const chatId = roomId;
        const chat = await saveMessage({
            receiver,
            senderId, 
            receiverId, 
            chatId, 
            message
        });
        await ChatMessage.update({"status": "read"}, {where: {receiverId: senderId, chatId: chat.chatId, status: "deliverd"}});
        socket.broadcast.to(roomId).emit("receive message", { chat });
        socket.emit("message sent", { chat })
      } else {
        const chat = await saveMessage({
            receiver,
            senderId, 
            receiverId, 
            chatId: roomId,
            message, 
            status: "pending"
        });
        await ChatMessage.update({"status": "read"}, {where: {receiverId: senderId, chatId: chat.chatId, status: "deliverd"}});
        socket.broadcast.to(roomId).emit("receive message", { chat }); 
        socket.emit("message sent", { chat })
      }
    } catch (err) {
      socket.emit("message sent", err.message);
      console.error(err);
    }
}