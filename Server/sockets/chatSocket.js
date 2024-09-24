const {readMessage, privatemessaging} = require("../Services/chatService");
const {Chat} = require("../Models/index");

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

module.exports = (io, socket) => {
  const user = socket.user;

  /**
   * joinRoom - event to handle joinig a chat
   * roomId: id of the chat
   */

  socket.on("joinRoom", async (data) => {
    const { roomId } = data;
    try {
      let chat = await Chat.findByPk(roomId);
      if (!chat) {
        socket.emit("join room", "room does not exist");
        return;
      }
      const participants = await chat.getParticipants();
      const isParticipant = participants.some(participant => (participant.id === user.id));
      
      if (isParticipant) {
        socket.join(roomId);
        socket.emit("join room", "joined successfully");
      } else {
        socket.emit("join room", "not authorized");
      }
      
    } catch (error) {
      socket.emit("join room", error.message);
    }
  });
  

  socket.on("message read", async (data) => { 
    const {roomId} = data;
    await readMessage(io, socket, user.id, roomId);
  });

  /** 
   * private message - event to handle sending and receiving the messages
   * data: objects that contains the following:
   * senderId: the sender id
   * receiverId: the receiver id
   * roomId: the id of the room of the chat
   * message: the content of the message
  */
  socket.on("private message", async (data) => {
    const {senderId} = data;
    if (senderId !== user.id) {
      socket.emit("message sent", "unauthorized")
    } else {
      await privatemessaging(io, socket, data);
    }
  });
}
