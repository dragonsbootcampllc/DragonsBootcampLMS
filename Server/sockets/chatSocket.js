const {readMessage, privatemessaging} = require("../Services/chatService");
const {Chat} = require("../Models/index");


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
