const asyncHandler = require('express-async-handler');
const { UserActivity } = require('../Models/index');
const ApiError = require('../utils/ApiError');

const getUserActivities = asyncHandler(async (req, res) => {
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

const getUserActivity = asyncHandler(async (req, res) => {
    const { user } = req;
    const { activityId } = req.params;

    const activity = await UserActivity.findByPk(activityId);

    if (!activity) {
        throw new ApiError('There is no activity with this id.', 404);
    }

    if (activity.userId != user.id) {
        throw new ApiError('This activity belongs to another user so you cannot access it.', 403);
    }

    res.json({ activity });
})

module.exports = { getUserActivities, getUserActivity };
