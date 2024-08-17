const { Lecture, Course, Task } = require("../Models/index");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

exports.uploadLecture = asyncHandler(async (req, res, next) => {
  const { startTime, endTime, type, recordedLink, text, order, courseId } =
    req.body;
  console.log(startTime, endTime, type, order, courseId);
  if (!startTime || !endTime || !type || !courseId) {
    return res.status(400).json({ message: "Required fields are missing" });
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
  const { startTime, endTime, type, recordedLink, text, order, courseId } = req.body;
  const id = req.params.id;

  const lecture = await Lecture.findByPk(id);
  if (!lecture) {
    return next(new ApiError("No lecture was found with this id", 404));
  }
  if (courseId) {
    const course = await Course.findByPk(courseId);
    if (!course) {
      return next(new ApiError("No course was found with this id", 404));
    }
  }
  lecture.set(
    {
        ...req.body,
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
