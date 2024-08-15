const { Course, Lecture, Task } = require('../Models/index');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

 exports.createCourse = asyncHandler(async (req, res, next) => {
    const { name, description, lectures } = req.body;
    const user = req.user;

    if (!name || !description || !lectures) {
        return next(
            new ApiError("All fields are required", 400)
        );
    }
    try{
        const lecturesCount = lectures.length;
        const course = await Course.create({
            name,
            description,
            educatorId:user.id,
            lecturesCount
        });
        for(const lectureData of lectures){
            const lecture = await Lecture.create({
                startTime: lectureData.startTime,
                endTime: lectureData.endTime,
                type: lectureData.type,
                text: lectureData.text,
                recordedLink: lectureData.recordedLink,
                order: lectureData.order,
                courseId: course.id
            });

            for(const taskData of lectureData.tasks){
                const task = await Task.create({
                    type: taskData.type,
                    description: taskData.description,
                    text: taskData.text,
                    testcases: taskData.testcases,
                    options: taskData.options,
                    answer: taskData.answer,
                    startTime: taskData.startTime,
                    endTime: taskData.endTime,
                    lectureId: lecture.id
                });    
        }   
    }

        return res.status(201).json({
            status: "success",
            message: "Course created successfully",
            course
        });
} catch (err) {
    return next(
        new ApiError(err.message, 500)
    );
}
})


exports.getAllCourses = asyncHandler(async (req, res, next) => {
    try{
        const courses = await Course.findAll({
            include: [{
                model: Lecture,
                as: 'lectures',
                include: [{
                    model: Task,
                    as: 'tasks'
                }]
            }]
        });
        res.status(200).json(courses);
    } catch(err){
        return next (
            new ApiError(err.message, 500)
        )
    }
});


exports.getCourseById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    try {
        const course = await Course.findByPk(id, {
           include: {
               model: Lecture,
               as: 'lectures',
               include: {
                   model: Task,
                   as: 'tasks'
               }
           }
           }
        ); 

        if (!course) {
            return next(
                new ApiError("No course was found with this id", 404)
            );
        }

        res.status(200).json({course});
    } catch (err) { 
        return next(
            new ApiError(err.message, 500)
        );
    }
  })    


  exports.updateCourse = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const { name, description, lectures } = req.body;
    const user = req.user;

    try{
        const course = await Course.findByPk(id);

        if (!course) {
            next (
                new ApiError("No course was found with this id", 404)
            );
        }
      

        await course.update({
            name,
            description,
            educatorId:user.id,       
        })

        if(lectures && lectures.length > 0){
            await Lecture.destroy({
                where: {
                    courseId: id
                }
            });
            for(const lectureData of lectures){
                const { startTime, endTime, type, text, recordedLink, order, tasks } = lectureData;
                const lecture = await Lecture.create({
                    startTime: lectureData.startTime,
                    endTime: lectureData.endTime,
                    type: lectureData.type,
                    text: lectureData.text,
                    recordedLink: lectureData.recordedLink,
                    order: lectureData.order,
                    courseId: course.id
                });
        
        
            if(tasks && tasks.length){
                for(const taskData of tasks){
                    const { type, description, text, testcases, options, answer, startTime, endTime } = taskData;
                    const task = await Task.create({
                        type: taskData.type,
                        description: taskData.description,
                        text: taskData.text,
                        testcases: taskData.testcases,
                        options: taskData.options,
                        answer: taskData.answer,
                        startTime: taskData.startTime,
                        endTime: taskData.endTime,
                        lectureId: lecture.id
                    });
                }
            }            
        }        
    }

        return res.status(200).json({
            status: "success",
            message: "Course updated successfully",
            course
        });

    } catch (err) {
        next (
            new ApiError(err.message, 500)
        );
    }
});

exports.deleteCourseById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return next(
                new ApiError("No course was found with this id", 404)
            );
        }

        await Lecture.destroy({
            where: {
                courseId: id
            }
        })

        await Task.destroy({
            where: {
                lectureId: id
            }
        })

        await course.destroy();

        return res.status(200).json({
            status: "success",
            message: "Course deleted successfully",
        });
    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
});


