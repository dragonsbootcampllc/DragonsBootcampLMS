const notificationService = require('../Services/notificationService');
const { User } = require("../Models/index");

module.exports = (io, socket) => {
    const user = socket.user;
    socket.on('subscribeToNotifications', () => {
      const userId = user.id;
      socket.join(`notifications_${userId}`);
    });
  
    socket.on('readNotification', async () => {
      await notificationService.readNotification(io, socket);
    })
  };