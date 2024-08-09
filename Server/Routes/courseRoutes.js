const {createCourse, getAllCourses, getCourseById, updateCourse, deleteCourseById} = require('../Controllers/courseController');
const verifyRole = require('../utils/verifyRole');
const {courseValidator} = require('../utils/validators/courseValidator');
const router = require('express').Router();

router.post("/", verifyRole("educator"),courseValidator, createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", verifyRole("educator") ,courseValidator, updateCourse);
router.delete("/:id", verifyRole("educator"),deleteCourseById);

module.exports = router;
