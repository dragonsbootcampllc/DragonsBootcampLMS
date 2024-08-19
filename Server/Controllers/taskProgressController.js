const {UserTaskProgress} = require('../Models/index');
const {Task} = require('../Models/index')
const {Lecture} = require('../Models/index')
const ApiError = require('../utils/ApiError');
const asyncHandler = require('express-async-handler');

exports.calculateAverageTaskProgress = asyncHandler(async (req, res, next) => {
    const courseId = req.params;
    const userId = req.user.id;
    
    const tasks_count = await Task.count({
        include: [{
            model: Lecture,
            where: {
                courseId,
            },
        }]
    });
    console.log(tasks_count);

    const tasks_completed_count = await UserTaskProgress.count({
        where: {
            is_finished: true,
            userId,
        },
    });
    console.log(tasks_completed_count);

    const average_progress = (tasks_count / tasks_completed_count) * 100;
    console.log(average_progress);

    res.status(200).json({average_progress})
})