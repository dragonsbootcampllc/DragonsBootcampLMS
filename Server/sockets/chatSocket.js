const chatService = require("../services/chatService");
const {createGroup, createGroupMember} = require("../Services/groupService");
const {User} = require("../Models/index");
const {ChatMessage} = require("../Models/index");


module.exports = (io, socket) => {
  const user = socket.user;
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("joinGroup", async (data) => { 
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

  socket.on("sendGroupMessage", async (messageData) => {
    // Persist the message and emit it to the chat room
    const message = await chatService.saveMessage(messageData);
    io.to(messageData.groupId).emit("newGroupMessage", message);
  });


  socket.on("createGroup", async (room) => {
    try {
      if (user.role === "educator") {
        const group = await createGroup(room.name);
        const member = await createGroupMember(group.dataValues.id, user.id, "admin");
        socket.join(room);
        console.log("group created")
        io.to(room).emit("createGroup", {"message": "group created"});
      } else {
        io.emit({"message": "only educators can create groups"})
      }
    } catch (err) {
      console.log(err);
      io.emit("error", { message: err.message});
    }
  });
};
