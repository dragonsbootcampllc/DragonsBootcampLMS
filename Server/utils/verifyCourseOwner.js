const { UserCourseProgress } = require("../Models");

const verifyCourseOwner = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  const userCourse = await UserCourseProgress.findOne({
    where: {
      userId: req.user.id,
      courseId: req.params.id,
    },
  });
  if (!userCourse) {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};

module.exports = verifyCourseOwner;
