const asyncHandler = require('express-async-handler');
const { UserActivity } = require('../Models/index');

const getActivities = asyncHandler(async (req, res) => {
    const { user } = req;
    const activities = await UserActivity.findAll({ where: { userId: user.id }});

    res.json({ activities });
});

module.exports = { getActivities };
