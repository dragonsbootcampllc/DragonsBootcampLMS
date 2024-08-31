const {Task, UserTaskProgress} = require('../Models/index');
const asyncHandler = require('express-async-handler');
const {Lecture} = require('../Models/index');
const ApiError = require('../utils/ApiError');
const { UserTaskProgress } = require('../Models/index');
const { Course, UserCourseProgress } = require('../Models/index');


exports.uploadTask = asyncHandler (async (req, res, next) => {
    const {type, description, text, testcases, options, answer, startTime, endTime, lectureId} = req.body;

    if (!type || !answer || !startTime || !endTime || !lectureId) {
        return next (
            new ApiError("All fields are required", 400)
        );
    }
    try {
        const lecture = await Lecture.findOne({
            where:{
                id: lectureId
            }
        });
        if (!lecture) {
            return next(
                new ApiError("No lecture was found with this id", 404)
            );
        }
    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }

    try {
        const task = await Task.create({
            type,
            description,
            text,
            testcases,
            options,
            answer,
            startTime,
            endTime,
            lectureId,
        });
        return res.status(201).json(task);
    } catch (err) {
        return next(new ApiError(err.message, 500));
    }
});

exports.getTaskById = asyncHandler (async (req, res, next) => {
    const id = req.params.id;
    try {
       const task = await Task.findByPk(id);
       if (!task) {
        return next (
            new ApiError("No task was found with this id", 404)
        );
       }
       return res.status(200).json(task);
    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
});

exports.updateTask = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const task = await Task.findByPk(id);
    if (!task) {
        next (
            new ApiError("No task was found with this id", 404)
        );
    }
    
    const updatedValues = {...req.body};
    try {
        task.set({
            ...updatedValues
        },
        {
            where: {
                id,
            }
        });
        await task.save();
        return res.status(200).json(task);
    } catch (err) {
       next (
        new ApiError(err.message, 500)
       ); 
    }
});


exports.deleteTaskById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            next (
                new ApiError("No task was found with this id.", 404)
            );
        }
        await task.destroy();
        return res.status(200).json({"message": "task was deleted sucessfully"});
    } catch (err) {
        next (
            new ApiError(err.message, 500)
        );
    }
});


exports.markTaskAsFinished = asyncHandler(async (req, res, next) => {
    const { taskId } = req.params;
    const userId = req.user ? req.user.id : null;
    const { answer } = req.body;

    if (!taskId || !userId) {
        return res.status(400).json({ message: "Task ID or User ID is missing" });
    }

    if (!answer || answer.trim() === "") {
        return res.status(400).json({ message: "Answer is required to complete the task." });
    }

    try {
        const task = await Task.findByPk(taskId, {
            include: {
                model: Lecture,
                as: 'lecture',
                include: {
                    model: Course,
                    as: 'course'
                }
            }
        });

        if (!task) {
            return next(new ApiError("No task was found with this ID", 404));
        }

        const enrollment = await UserCourseProgress.findOne({
            where: {
                userId,
                courseId: task.lecture.courseId,
            }
        });

        if (!enrollment) {
            return next(new ApiError('User is not enrolled in the course related to this task', 403));
        }

        let taskProgress = await UserTaskProgress.findOne({
            where: { userId, taskId }
        });

        if (taskProgress) {
            return res.status(400).json({ message: "You have already submitted an answer for this task." });
        }

        let isFinished = false;
        let isSolve = false

        if (task.type === "text") {
            isFinished = true;
            isSolve = false;
        } else if (task.type === "options") {
            if (answer === task.answer) {
                isFinished = true;
                isSolve = true;
            } else {
                isSolve = false
                isFinished = true;
            }
        } else if (task.type === "code") {
            isFinished = true;
            isSolve = false;
        }

        taskProgress = await UserTaskProgress.create({
            userId,
            taskId,
            is_finished: isFinished,
            is_solve: isSolve,
            answer,
            completed_at: isFinished ? new Date() : null,
        });

        return res.status(200).json({
            id: taskProgress.id,
            userId: taskProgress.userId,
            finished: taskProgress.is_finished,
            isSolve,
            answer,
            completionDate: taskProgress.completed_at,
            createdAt: taskProgress.createdAt,
            updatedAt: taskProgress.updatedAt
        });
    } catch (err) {
        console.error("Error marking task as finished:", err);
        return next(new ApiError('Failed to mark task as finished', 500));
    }
});

exports.getRecentTask = asyncHandler(async (req, res, next) => {
    const limit = parseInt(req.params.limit, 10);

    if (isNaN(limit) || limit <= 0 || limit > 4) {
        return res.status(400).json({ message: "Invalid limit parameter" });
    }
    const tasksprogress = await UserTaskProgress.findAll({
        where: {
            userId: req.user.id,
            is_finished: true,
        },
        order: [['completed_at', 'DESC']],
        limit,
    });
    
    return res.status(200).json({"message": "sucess", tasks:tasksprogress});
});

