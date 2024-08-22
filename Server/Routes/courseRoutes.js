const {createCourse, getAllCourses, getCourseById, updateCourse, deleteCourseById} = require('../Controllers/courseController');
const verifyRole = require('../utils/verifyRole');
const {courseValidator} = require('../utils/validators/courseValidator');
const protect = require('../middlewares/protect');
const progressRoutes = require('./progressRoutes'); 
const taskProgressRoutes = require('./taskProgressRoute');
const router = require('express').Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// protected Routes
router.post("/",protect, verifyRole("educator"),courseValidator, createCourse);
router.put("/:id",protect, verifyRole("educator"), updateCourse);
router.delete("/:id",protect, verifyRole("educator"),deleteCourseById);

//progress Routes
router.use("/", progressRoutes);
router.use("/", taskProgressRoutes);

module.exports = router;

