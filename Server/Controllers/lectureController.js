const { Lecture, Course, Task } = require("../Models/index");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
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
