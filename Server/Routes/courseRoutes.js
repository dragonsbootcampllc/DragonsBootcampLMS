const {createCourse, getAllCourses, getCourseById, updateCourse, deleteCourseById, getCourseDetails} = require('../Controllers/courseController');
const verifyRole = require('../utils/verifyRole');
const {courseValidator} = require('../utils/validators/courseValidator');
const protect = require('../middlewares/protect');
const progressRoutes = require('./progressRoutes'); 
const router = require('express').Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// protected Routes
router.post("/",protect, verifyRole("educator"),courseValidator, createCourse);
router.put("/:id",protect, verifyRole("educator"), updateCourse);
router.delete("/:id",protect, verifyRole("educator"),deleteCourseById);
router.get('/:courseId/details',protect, getCourseDetails);

//course progress Routes
router.use("/",progressRoutes);

module.exports = router;
