const {Task} = require('../Models/index');
const asyncHandler = require('express-async-handler');
const {Lecture} = require('../Models/index');
const ApiError = require('../utils/ApiError');

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

    try{
        const task = await Task.findByPk(id);
        if (!task) {
            next (
                new ApiError("No task was found with this id", 404)
            );
        }
    } catch (err) {
        next (
            new ApiError(err.message, 500)
        );
    }
    
    const {type, description, text, testcases, options, answer, startTime, endTime, lectureId} = req.body;  
    try {
        const lecture = await Lecture.findByPk(lectureId);
        if (!lecture) {
            next (
                new ApiError("No lecture was found with this id", 404)
            );
        }
        const task = await Task.update({
            type,
            description,
            text,
            testcases,
            options,
            answer,
            startTime,
            endTime,
            lectureId,
        },
        {
            where: {
                id,
            }
        });
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