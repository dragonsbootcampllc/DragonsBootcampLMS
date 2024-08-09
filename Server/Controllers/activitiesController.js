const asyncHandler = require('express-async-handler');
const { UserActivity } = require('../Models/index');
const ApiError = require('../utils/ApiError');

const getActivities = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const activities = await UserActivity.findAll(
        {
            limit,
            offset,
        }
    );

    res.json({ activities });
});

const getActivity = asyncHandler(async (req, res) => {
    const { activityId } = req.params;

    const activity = await UserActivity.findByPk(activityId);

    if (!activity) {
        throw new ApiError('There is no activity with this id.', 404);
    }

    res.json({ activity });
});

module.exports = { getActivities, getActivity };
