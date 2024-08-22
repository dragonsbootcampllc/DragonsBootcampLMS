const { Course, Lecture, Task, UserLectureProgress, UserTaskProgress, UserCourseProgress, User } = require('../Models/index');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

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


exports.getCourseDetails = asyncHandler(async (req, res, next) => {
    const { courseId } = req.params;
    console.log('courseId', courseId);
    const userId = req.user ? req.user.id : null;
    console.log('userId', userId); 
    try {
        // Fetch course details
        const course = await Course.findByPk(courseId, {
            include: [
                {
                    model: Lecture,
                    as: 'lectures',
                    include: [
                        {
                            model: Task,
                            as: 'tasks'
                        }
                    ]
                }
            ]
        });

        if (!course) {
            return next(new ApiError("Course not found", 404));
        }

        const totalLectures = course.lectures.length;
        const totalTasks = course.lectures.reduce((acc, lecture) => acc + lecture.tasks.length, 0);

        let LecturePercentage = 0;
        let tasksPercentage = 0;

        if (userId) {
            const attendedLectures = await UserLectureProgress.count({
                where: { userId, courseId, attended: true }
            });

            const completedTasks = await UserTaskProgress.count({
                where: {
                    userId,
                    taskId: {
                        [Op.in]: course.lectures.flatMap(lecture => lecture.tasks.map(task => task.id))
                    },
                    finished: true
                }
            });

            LecturePercentage = totalLectures ? Math.floor(attendedLectures / totalLectures) * 100 : 0;
            tasksPercentage = totalTasks ? Math.floor((completedTasks / totalTasks) * 100) : 0;


        }

        res.status(200).json({
            courseDetails: {
                id: course.id,
                name: course.name,
                description: course.description,
                totalLectures,
                totalTasks
            },
            lectures: course.lectures.map(lecture => ({
                id: lecture.id,
                tasks: lecture.tasks.map(task => ({
                    id: task.id,
                    description: task.description
                }))
            })),
            progress: {
                LecturePercentage,
                tasksPercentage
            }
        });

    } catch (err) {
        console.error(err);
        return next(new ApiError("Failed to fetch course details", 500));
    }
});
