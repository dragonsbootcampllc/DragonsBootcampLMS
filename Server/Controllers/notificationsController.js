const {Notification} = require("../Models/index");
const ApiError = require("../utils/ApiError");

exports.readNotification = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const notifications = await Notification.update({read: true}, {
            where: {
                userId,
                read: false,
            }
        });
        return res.status(200).json({notifications});
    } catch (err) {
        return next(new ApiError(err.message, 500))
    }
}

exports.getAllNotifications = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const notifications = await Notification.findAll({
            where: {userId},
            order: [["createdat", "DESC"]]});
        return res.status(200).json({notifications});
    } catch (err) {
        return next(new ApiError(err.message, 500));
    }
}