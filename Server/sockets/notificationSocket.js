const notificationService = require('../services/notificationService');

module.exports = (io, socket) => {
    socket.on('subscribeToNotifications', (data) => {
      const userId = 2; 
      socket.emit('subscribeToNotifications', { id: userId });

      console.log(`User ${userId} subscribed to notifications`);
      socket.join(`notifications_${userId}`);
  });

    socket.on('sendNotification', async (notificationData) => {
        try {
            const notification = await notificationService.createNotification(notificationData);
            console.log(`Sending notification to user: ${notificationData.userId}`);
            io.to(`notifications_${notificationData.userId}`).emit('newNotification', notification); // Emit notification
        } catch (err) {
            console.error('Error sending notification:', err);
        }
    });
};
