const chatService = require("../services/chatService");
const {User} = require("../Models/index");
const {ChatMessage} = require("../Models/index");


module.exports = (io, socket) => {
  const user = socket.user;

  socket.on("joinRoom", async (data) => { 
    const {groupId} = data;
    socket.join(groupId);
    try{
      const messages = await ChatMessage.findAll({where: {chatId: groupId, receiverId: user.id, status: "deliverd"}});
      messages.forEach(async mes => {
        await ChatMessage.update({status: "read"}, {where: {id: mes.dataValues.id, status: "deliverd"} });
        io.to(groupId).emit("message read", {mes})
      });
    } catch (err) {
      socket.emit("message read", err.message)
      console.log(err.message)
    }

  });

  socket.on("private message", async (data) => {
    const {senderId, receiverId, roomId, message} = data;

    try {
      const receiver = User.findByPk(receiverId);
      if (receiver && receiver.socketId) {
        const chatId = roomId;
        const chat = await chatService.saveMessage({
          senderId, 
          receiverId, 
          chatId, 
          message
        });
        socket.broadcast.to(roomId).emit("receive message", { chat });
        socket.emit("message sent", {"status": "deliverd"})
      } else {
        const chat = await chatService.saveMessage({
          senderId, 
          receiverId, 
          chatId: roomId,
          message, 
          status: "pending"
        });
        socket.broadcast.to(roomId).emit("receive message", { chat }); 
        socket.emit("message sent", {"status": "pending"})
      }
    } catch (err) {
      socket.emit("message sent", err.message);
      console.error(err.message);
    }
  });
}