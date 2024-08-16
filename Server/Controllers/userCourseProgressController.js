const { UserCourseProgress } = require('../Models/index');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');


exports.storeProgress = asyncHandler(async (req, res, next) => {
    const { id } = req.params; 
    const userId = req.user.id;

    if (!id || !userId) {
        return next(new ApiError(400, 'Course ID and User ID are required.'));
    }

    try {
        let progress = await UserCourseProgress.findOne({ where: { userId, courseId: id } });

        if (!progress) {
            progress = await UserCourseProgress.create({ userId, courseId: id, startedAt: new Date() });
        } else {
            await progress.update({ completedAt: new Date(), isCompleted: true });
        }

        res.status(201).json(progress);
    } catch (error) {
        console.error("Error during storeProgress operation:", error);
        return next(new ApiError(500, `An internal server error occurred: ${error.message}`));
    }
});


exports.retrieveProgress = asyncHandler(async (req, res, next) => {
    const { id } = req.params; 
    const userId = req.user.id;

    if (!id || !userId) {
        return next(new ApiError(400, 'Course ID and User ID are required.'));
    }

    const progress = await UserCourseProgress.findOne({ where: { userId, courseId: id } });

    if (!progress) {
        return next(new ApiError(404, 'Progress not found.'));
    }

    res.status(200).json(progress);
});
