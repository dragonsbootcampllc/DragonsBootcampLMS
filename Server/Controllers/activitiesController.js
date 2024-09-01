const asyncHandler = require('express-async-handler');
const { UserActivity, User } = require('../Models/index');
const ApiError = require('../utils/ApiError');

exports.getActivities = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const activities = await UserActivity.findAll(
        {
            limit,
            offset,
            include: {
                model: User,
                attributes: ['username', 'email','role'],
            }
        }
    );

    res.json({ activities });
});

exports.getActivity = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const activity = await UserActivity.findByPk(id,{
        include: {
            model: User,
            attributes: ['username', 'email','role'],
        }
    });

    if (!activity) {
        throw new ApiError('There is no activity with this id.', 404);
    }

    res.json({ activity });
});

exports.getUserActivities = asyncHandler(async (req, res) => {
    const { user } = req;

    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const activities = await UserActivity.findAll({
        where: { userId: user.id },
        limit,
        offset,
    });

    res.json({ activities });
});

exports.getUserActivity = asyncHandler(async (req, res) => {
    const { user } = req;
    const { id } = req.params;

    const activity = await UserActivity.findByPk(id);

    if (!activity) {
        throw new ApiError('There is no activity with this id.', 404);
    }

    if (activity.userId != user.id) {
        throw new ApiError('This activity belongs to another user so you cannot access it.', 403);
    }

    res.json({ activity });
})

exports.logUserActivity = asyncHandler(async (req, res) => {
    const { user } = req;
    const { activityType, activityDetails } = req.body;

    const activity = await UserActivity.create({
        userId: user.id,
        activityType,
        activityDetails,
    },{returning: true});

    activity.save();

    res.status(201).json({ activity });
});
