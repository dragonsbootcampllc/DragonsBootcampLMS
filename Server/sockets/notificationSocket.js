const notificationService = require('../services/notificationService');

module.exports = (io, socket) => {
    socket.on('subscribeToNotifications', (userId) => {
      socket.join(`notifications_${userId}`);
    });
  
    socket.on('sendNotification', async (notificationData) => {
      // Persist the notification and emit it to the user
      const notification = await notificationService.createNotification(notificationData);
      io.to(`notifications_${notificationData.userId}`).emit('newNotification', notification);
    });
  };
  