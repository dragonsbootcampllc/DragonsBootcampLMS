const {Task} = require('../Models/index');
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
    console.log(id);
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
    const { taskId } = req.body;
    const userId = req.user ? req.user.id : null;
    console.log('user id :',userId);

    const courseId = Lecture.courseId;

    if (!taskId || !userId) {
        return res.status(400).json({ message: "Task ID or User ID is missing" });
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

        console.log("Lecture ID:", task.lecture.id);
        console.log("Course ID:", task.lecture.courseId);

        const enrollment = await UserCourseProgress.findOne({
            where: {
                userId,
                courseId: task.lecture.courseId,
            }
        });

        if (!enrollment) {
            console.log("User is not enrolled in the course related to this task");
            return next(new ApiError('User is not enrolled in the course related to this task', 403));
        }

        let taskProgress = await UserTaskProgress.findOne({
            where: { userId, taskId }
        });

        if (!taskProgress) {
            taskProgress = await UserTaskProgress.create({
                userId,
                taskId,
                finished: true,
                completionDate: new Date(),
            });
        } else {
            await taskProgress.update({
                finished: true,
                completionDate: new Date(),
            });
        }

        return res.status(200).json({
            id: taskProgress.id,
            userId: taskProgress.userId,
            taskId: taskProgress.taskId,
            courseId: task.lecture.courseId,  // Include courseId in the response
            lectureId: task.lecture.id,       // Include lectureId in the response
            finished: taskProgress.finished,
            completionDate: taskProgress.completionDate,
            createdAt: taskProgress.createdAt,
            updatedAt: taskProgress.updatedAt
        });
    } catch (err) {
        console.error("Error marking task as finished:", err);
        return next(new ApiError('Failed to mark task as finished', 500));
    }
});