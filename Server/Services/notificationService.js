const { where } = require("sequelize");
const { Notification, User } = require("../Models/index");

/**
 * store a notification in the database
 *  
 * @param {Object} notificationData 
 * @returns {Object}
 */
const createNotification = async (notificationData) => {
    try {
        const notification = await Notification.create(notificationData);
        return notification;
    } catch (err) {
        throw new Error(err.message);
    }
}

/**
 * mark a notification as read
 * 
 * @param {Object} io 
 * @param {Object} socket 
 */
exports.readNotification = async (io, socket) => {
    const userId = socket.user.id;
    const notifications = await Notification.update({read: true}, {
        where: {
            userId,
            read: false,
        }
    });

    io.to(`notifications_${userId}`).emit("read notification", {notifications});
}

/**
 * retrieve all the notification from when the user were offline(used upon the connection)
 * 
 * @param {Object} io 
 * @param {Object} socket 
 */
exports.deliverNotification = async (io, socket) => {
    try{
        const userId = socket.user.id;
        const {count, rows: notifications} = await Notification.findAndCountAll({
            where: {
                userId,
                deliverd: false,
            },
            order: [['createdat', 'DESC']],
        });
        await Notification.update({deliverd: true}, {where: {userId, deliverd: false}});
        io.to(`notifications_${userId}`).emit("new notification", {count, notifications});
    } catch (err) {
        throw new Error(err.message);
    }
}

/**
 * join the notification room where the user gets all the notification(used upon the connection)
 * 
 * @param {Object} socket 
 */
exports.subscribeToNotifications = (socket) => {
    const userId = socket.user.id;
    socket.join(`notifications_${userId}`);
}

/**
 * emit a notification to the frontent(used whereever we need to notifiy the user of a new event)
 * 
 * @param {Object} io 
 * @param {Array[Integer]} userIds 
 * @param {String} type 
 * @param {Object} payload 
 */
exports.notifyUsers = async (data) => {
    const {users, type, payload, io} = data
    const notifications = users.map(user => ({
        userId: user.id,
        notificationType: type,
        notificationContent: payload,
        deliverd: user.socketId ? true : false,
    }));

    // Emit notifications for each user
    notifications.forEach(notification => {
        io.to(`notifications_${notification.userId}`).emit("new notification", {notification});
    });

    // Save notifications to the database
    try {
        const createdNotifications = await Notification.bulkCreate(notifications);
        console.log('Notifications created:', createdNotifications);
    } catch (notificationError) {
        throw new Error(err.message);
    }
};