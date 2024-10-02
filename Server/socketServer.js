const { Server } = require("socket.io");
const { User } = require("./Models/index");
const {ChatMessage, Chat} = require("./Models/index")
const {chatexists, joinRoom} = require("./Services/chatService");
const {deliverNotification, subscribeToNotifications} = require("./Services/notificationService");
const { where } = require("sequelize");
// const socketUtils = require('./utils/socketUtils');

module.exports = function(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // Update this with your client's URL
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', async (socket) => {
    console.log('A user connected:', socket.id);
    const user = socket.user;
    try {
      //switch user status to online
      await joinRoom(user, socket);
      subscribeToNotifications(socket);
      await deliverNotification(io, socket);

      await User.update({socketId: socket.id, online: true}, {where: { id: user.id }});
      user.socketId = socket.id;
      socket.emit("update user status", {"status": "online", user})
      //send the pending messages from when the user was offline
      const pending_messages = await ChatMessage.findAll({
        where: {
          receiverId: user.id,
          status: "pending",
        }
      });

      pending_messages.forEach(async message => {
        await ChatMessage.update({status: "deliverd"}, {where: {id: message.dataValues.id, status: "pending"} });
        if (chatexists(message.dataValues.senderId, user.id)) {
          socket.emit("receive message", {message});
        } else {
          socket.emit("new chat", { chatId: message.chatId });
          socket.emit("receive message", {message});
        }
      });
    } catch (err) {
      console.log(err.message)
      socket.emit("update user status", {"message": err.message});
    }
    console.log(user);

    // Initialize chat socket events
    require('./sockets/chatSocket')(io, socket);

    // Initialize notification socket events
    require('./sockets/notificationSocket')(io, socket);

    socket.on('disconnect', async () => {
      try {
        await User.update({ socketId: null, online: false }, { where: { id: user.id } })
        socket.emit("update user status", {"status": "offline", user});
      } catch (err) {
        socket.emit("update user status", {"messsage": err.message});
      }
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};
