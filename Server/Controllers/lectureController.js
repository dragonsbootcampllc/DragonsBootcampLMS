const { Lecture, Course, Task, UserTaskProgress, UserLectureProgress, UserCourseProgress } = require('../Models/index');
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const { Op } = require('sequelize');
const PickExistVars = require("../utils/PickExistVars");

exports.uploadLecture = asyncHandler(async (req, res, next) => {
  const { startTime, endTime, type, recordedLink, text, order, courseId ,estimated_time} =
    req.body;
  if (!startTime || !endTime || !type || !courseId) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  // Validate start and end time
  const startTimeObj = new Date(startTime);
  const endTimeObj = new Date(endTime);

  if (!(startTimeObj instanceof Date && !isNaN(startTimeObj.getTime()))) {
    return res.status(400).json({ message: "Invalid start time" });
  }

  if (!(endTimeObj instanceof Date && !isNaN(endTimeObj.getTime()))) {
    return res.status(400).json({ message: "Invalid end time" });
  }

  // Check if start time is earlier than end time
  if (startTimeObj >= endTimeObj) {
    return res.status(400).json({ message: "Start time must be earlier than end time" });
  }

  // Check if start time and end time are in the past
  const currentTime = new Date();
  if (startTimeObj < currentTime || endTimeObj < currentTime) {
    return res.status(400).json({ message: "Start time and end time cannot be in the past" });
  }

  const course = await Course.findByPk(courseId);

  if (!course) {
    return next(new ApiError(`no course was found with this id`, 404));
  }
  try {
    const lecture = await Lecture.create({
      startTime,
      endTime,
      type,
      recordedLink,
      text,
      order,
      courseId,
      estimated_time,
    });
    return res.status(201).json(lecture);
  } catch (err) {
    return next(new ApiError(err.message, 500));
  }
});

exports.getLectureById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const lecture = await Lecture.findByPk(id, {
    include: {
      model: Task,
      as: "tasks",
    },
  });
  if (!lecture) {
    return next(new ApiError("No lecture was found with this id", 404));
  }
  return res.status(200).json(lecture);
});

exports.updateLectureById = asyncHandler(async (req, res, next) => {
  const updatedValues = PickExistVars(req.body, [ "startTime", "endTime", "type", "recordedLink", "text", "order","courseId" ,"estimated_time"]);
  const id = req.params.id;

  const lecture = await Lecture.findByPk(id);
  if (!lecture) {
    return next(new ApiError("No lecture was found with this id", 404));
  }
  if (updatedValues.courseId) {
    const course = await Course.findByPk(updatedValues.courseId);
    if (!course) {
      return next(new ApiError("No course was found with this id", 404));
    }
  }

  const currentTime = new Date();

  // Validate start and end time
  if (updatedValues.startTime) {
    const startTimeObj = new Date(updatedValues.startTime);
    if (!(startTimeObj instanceof Date && !isNaN(startTimeObj.getTime()))) {
      return res.status(400).json({ message: "Invalid start time" });
    }
    // Check if start time and end time are in the past
    if (startTimeObj < currentTime) {
      return res.status(400).json({ message: "Start time cannot be in the past" });
    }
  }

  if (updatedValues.endTime) {
    const endTimeObj = new Date(updatedValues.endTime);
    if (!(endTimeObj instanceof Date && !isNaN(endTimeObj.getTime()))) {
      return res.status(400).json({ message: "Invalid end time" });
    }
    // Check if start time and end time are in the past
    if (endTimeObj < currentTime) {
      return res.status(400).json({ message: "End time cannot be in the past" });
    }
  }

  // Check if start time is earlier than end time
  if (updatedValues.startTime && updatedValues.endTime) {
    const startTimeObj = new Date(updatedValues.startTime);
    const endTimeObj = new Date(updatedValues.endTime);
    if (startTimeObj >= endTimeObj) {
      return res.status(400).json({ message: "Start time must be earlier than end time" });
    }
  }

  lecture.set(
    {
        ...updatedValues,
    },
    {
      where: {
        id,
      },
    }
  );
  await lecture.save();
  return res.status(200).json(lecture);
});

exports.deleteLecture = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const lecture = await Lecture.findByPk(id);
  if (!lecture) {
    return next(new ApiError("No lecture was found with this id", 404));
  }
  await lecture.destroy();
  return res.status(200).json({ message: "lecture was deleted successfully" });
});


exports.markLectureAsAttended = asyncHandler(async (req, res, next) => {
  const { lectureId } = req.params;
  const userId = req.user ? req.user.id : null;
  console.log('lecture ID:', lectureId);
  console.log('user ID:', userId);
  
  if (!lectureId || !userId) {
    return res.status(400).json({ message: "Lecture ID or User ID is missing" });
  }

  try {
    const lecture = await Lecture.findByPk(lectureId);
    if (!lecture) {
      return next(new ApiError("No lecture was found with this ID", 404));
    }
    
    const courseId = lecture.courseId;
    const courseProgress = await UserCourseProgress.findOne({
      where: { userId, courseId }
    });
    
    console.log('course ID:', courseId);
    if (!courseProgress) {
      return next(new ApiError("User is not enrolled in the course", 403));
    }
    
    let lectureProgress = await UserLectureProgress.findOne({
      where: { userId, lectureId }
    });

    if (!lectureProgress) {
      lectureProgress = await UserLectureProgress.create({
        userId,
        lectureId,
        courseId,
        progress: 1.0, 
        attended: true,
        completionDate: new Date(),
      });
    } else {
      await lectureProgress.update({
        attended: true,
        progress: 1.0,
        completionDate: new Date(),
      });
    }

    const totalLectures = await Lecture.count({ where: { courseId } });
    const attendedLectures = await UserLectureProgress.count({
      where: { userId, courseId, attended: true }
    });

    const progressPercentage = (attendedLectures / totalLectures) * 100;

    // Calculate task progress
    const totalTasks = await Task.count({ where: { lectureId } });
    const completedTasks = await UserTaskProgress.count({
      where: {
        userId,
        taskId: {
          [Op.in]: (await Task.findAll({ where: { lectureId } })).map(task => task.id)
        },
        is_finished: true
      }
    });
    const tasksPercentage = totalTasks > 0 ? Math.floor(completedTasks / totalTasks) * 100 : 0;

    await courseProgress.update({
      completedLectures: attendedLectures,
      totalLectures,
      progress: progressPercentage
    });

    res.status(200).json({
      lectureProgress,
      progressPercentage,
      tasksInLecture: totalTasks,
      tasksPercentage
    });
  } catch (err) {
    console.error("Error marking lecture as attended:", err); 
    return next(new ApiError('Failed to mark lecture as attended', 500));
  }
});