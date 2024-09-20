const { Notification } = require("../Models/index");

exports.createNotification = async (notificationData) => {
    try {
        const notification = await Notification.create(notificationData);
        return notification;
    } catch (err) {
        throw new Error(err.message);
    }
}