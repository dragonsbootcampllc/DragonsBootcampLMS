const admin = require('../config/firebaseAdminConfig');
const Notification = require('../Models/notification');
const User = require('../Models/user');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

exports.sendNotification = asyncHandler(async (req, res, next) => {
    const { userId, notificationType, notificationContent, fcmToken } = req.body;

    if (!userId || !notificationType || !notificationContent || !fcmToken) {
        return next(
            new ApiError("All fields are required", 400)
        );
    }

    try {
     const user = await User.findByPk(userId);

     if (!user) {
        return next(
            new ApiError("User not found", 404)
        );
     }

     const notification = await Notification.create({
        userId,
        notificationType,
        notificationContent
     });

     // notification payload
     const payload = {
        notification: {
            title: notificationType,
            body: notificationContent
        },
        data : {
            notificationId: notification.id.toString(),
        }
     };
      
     // send notification using fcm
     await admin.messaging().sendToDevice(fcmToken, payload);

     res.status(201).json({
        success: true,
        data: notification,
        message: "Notification sent successfully"
     });
    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
});

exports.sendAllNotifications = asyncHandler(async (req, res, next) => {
    const { notificationType, notificationContent } = req.body;

    if (!notificationType || !notificationContent) {
        return next(
            new ApiError("All fields are required", 400)
        );
    }

    try {
        const token = await User.findOne({
           // where if not null
            where: {
                fcmToken: {
                    [Op.ne]: null
                }
            }
        });

        if (!token) {
            return next(
                new ApiError("No token found", 404)
            );
        }

        const payload = {
            notification: {
                title: notificationType,
                body: notificationContent
            }
        };

        await admin.messaging().sendToDevice(token.fcmToken, payload);

        res.status(200).json({
            success: true,
            data: token,
            message: "Notifications sent successfully"
        });

    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
})

    

exports.updateNotitification = asyncHandler(async (req, res, next) => {
    const { id } = req.params; 

    try {
        const notification = await Notification.findByPk(id);

        if(!notification){
            return next(
                new ApiError("Notification not found", 404)
            )
        }

        notification.read = true;
        await notification.save();

        res.status(200).json({
            success: true,
            data: notification,
            message: "Notification updated successfully"
        });
    }  catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
})


exports.getNotificationsByUser   = asyncHandler(async (req, res, next) => {
    const { userId, read } = req.query;

    try {
        const notifications = await Notification.findAll({
            where: {
                userId,
                read
            },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            data: notifications,
            message: "Notifications fetched successfully"
        });

    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
})

exports.getAllNotifications = asyncHandler(async (req, res, next) => {
    try {
        const notifications = await Notification.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            data: notifications,
            message: "Notifications fetched successfully"
        });

    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
})


// SAVE FCM TOKEN
exports.saveFcmToken = asyncHandler(async (req, res, next) => {
    const { userId, fcmToken } = req.body;

    if (!userId || !fcmToken) {
        return next(
            new ApiError("All fields are required", 400)
        );
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return next(
                new ApiError("User not found", 404)
            );
        }

        user.fcmToken = fcmToken;
        await user.save();

        res.status(200).json({
            success: true,
            data: user,
            message: "FCM token saved successfully"
        });

    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
});
