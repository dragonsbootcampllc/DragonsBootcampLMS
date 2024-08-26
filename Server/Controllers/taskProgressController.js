const {UserTaskProgress, Task, Lecture} = require('../Models/index');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('express-async-handler');

exports.calculateAverageTaskProgress = asyncHandler(async (req, res, next) => {
    const lectureId = req.params.lectureId;
    const userId = req.user.id;
    
    const lecture = await Lecture.findByPk(lectureId);
    if (!lecture) {
        return next(
            new ApiError("No lecture was found", 404)
        )
    }

    const tasks_count = await Task.count({
        include: [{
            model: Lecture,
            as: "lecture",
            where: {
                lectureId,
            },
        }]
    });
    
    if (!tasks_count) {
        return res.status(200).json({"average_progress": tasks_count});
    }
    const tasks_completed_count = await UserTaskProgress.count({
        where: {
            is_finished: true,
            userId,
        },
    });

    const average_progress = (tasks_completed_count / tasks_count) * 100;

    res.status(200).json({
        average_progress,
        tasks_count,
        tasks_completed_count,
    })
})