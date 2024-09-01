const { Server } = require("socket.io");
// const socketUtils = require('./utils/socketUtils');

module.exports = function(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // Update this with your client's URL
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    const userId = socket.handshake.query.user_id;
    console.log('user_id',userId);

    // Initialize chat socket events
    require('./sockets/chatSocket')(io, socket);

    // Initialize notification socket events
    require('./sockets/notificationSocket')(io, socket);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};
