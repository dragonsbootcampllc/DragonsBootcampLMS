const chatService = require("../Services/chatService");
const {User} = require("../Models/index");
const {ChatMessage} = require("../Models/index");


module.exports = (io, socket) => {
  const user = socket.user;

  /**
   * joinRoom - event to handle joinig a chat
   * roomId: id of the chat
   */
  socket.on("joinRoom", async (data) => { 
    const {roomId} = data;
    socket.join(roomId);
    try{
      const messages = await ChatMessage.findAll({where: {chatId: roomId, receiverId: user.id, status: "deliverd"}});
      messages.forEach(async mes => {
        await ChatMessage.update({status: "read"}, {where: {id: mes.dataValues.id, status: "deliverd"} });
        io.to(roomId).emit("message read", {mes})
      });
    } catch (err) {
      socket.emit("message read", err.message)
      console.log(err.message)
    }

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
      chatService.privatemessaging(io, socket, data);
    }
  });
}
