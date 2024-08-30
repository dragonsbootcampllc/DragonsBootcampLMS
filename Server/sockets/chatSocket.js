const chatService = require("../services/chatService");

module.exports = (io, socket) => {
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("sendMessage", async (messageData) => {
    // Persist the message and emit it to the chat room
    console.log(messageData);
    const message = await chatService.saveMessage(messageData);
    io.to(messageData.chatId).emit("newMessage", message);
    io.emit("reciveMessage", message);
  });

  socket.on("joinGroup", (groupId) => { 
    socket.join(groupId);
  });

  socket.on("sendGroupMessage", async (messageData) => {
    // Persist the message and emit it to the chat room
    const message = await chatService.saveMessage(messageData);
    io.to(messageData.groupId).emit("newGroupMessage", message);
  });
};
