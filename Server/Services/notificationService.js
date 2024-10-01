const { Notification,  UserCourseProgress,ThreadParticipant } = require("../Models");

exports.createNotification = async (notificationData) => {
    try {
        const notification = await Notification.create(notificationData);
        return notification;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Function to emit notifications by socket
exports.emitNotification = (io, userId, message, threadId, postId) => {
    io.to(`notifications_${userId}`).emit('newNotification', {
        message,
        threadId,
        postId,
    });
};

// Function to notify multiple users
exports.notifyUsers = async (io, userIds, notificationMessage, threadId, postId) => {
    const notifications = userIds.map(userId => ({
        userId,
        notificationType: 'new_message',
        notificationContent: {
            message: notificationMessage,
            threadId,
            postId,
        }
    }));

    // Emit notifications for each user
    userIds.forEach(userId => {
        this.emitNotification(io, userId, notificationMessage, threadId, postId);
    });

    // Save notifications to the database
    try {
        const createdNotifications = await Notification.bulkCreate(notifications);
        console.log('Notifications created:', createdNotifications);
    } catch (notificationError) {
        console.error('Error creating notifications:', notificationError);
        throw new Error('Failed to create notifications');
    }
};
