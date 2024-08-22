const router = require('express').Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoute');
const activitiesRoutes = require('./activitiesRoutes');
const lectureRoutes = require('./lectureRoutes');
const courseRoutes = require('./courseRoutes');
const lectureProgressRoutes = require('./UserLectureProgress'); 
const taskProgressRoutes = require('./UserTaskProgress'); 


router.use("/auth",authRoutes);
router.use("/user",userRoutes);
router.use("/tasks", taskRoutes);
router.use("/activities", activitiesRoutes);
router.use("/lectures", lectureRoutes)
router.use("/courses", courseRoutes);
router.use('/lectures', lectureProgressRoutes); 
router.use('/tasks', taskProgressRoutes); 


module.exports = router;