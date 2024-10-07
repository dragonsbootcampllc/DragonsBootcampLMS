const { Notification } = require("../Models/index");
const UserPreference = require('./models/userPreference');

async function notification(io, { event, userId, message, type, roomId = "notification" }) {
try {
    // Fetch user preferences
    const userPreference = await UserPreference.findOne({ where: { userId } });

    // Proceed if user has notifications enabled
    if (userPreference?.notification) {
    // Create a new notification in the database
    const newNotification = await Notification.create({
        userId,
        notificationType: type,
        notificationContent: {
        title: message.title,
        body: message.body,
        },
    });

    // Determine event to emit, defaulting to roomId if event isn't passed
    const eventToEmit = event || roomId;

    // Emit notification to the room or event
    io.to(roomId).emit(eventToEmit, {
        userId,
        type: newNotification.notificationType,
        content: newNotification.notificationContent,
    });

    console.log(`Notification sent to user ${userId} in room ${roomId} via event: ${eventToEmit}`);
    } else {
    console.log(`Notifications are disabled for user ${userId}`);
    }
} catch (error) {
    console.error('Error sending notification:', error);
}
}

module.exports = notification;
