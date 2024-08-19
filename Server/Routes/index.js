const router = require('express').Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoute');
const lectureRoutes = require('./lectureRoutes');
const courseRoutes = require('./courseRoutes');
const progressRoutes = require('./progressRoutes'); 
const taskProgressRoutes = require('./taskProgressRoute');

router.use("/auth",authRoutes);
router.use("/user",userRoutes);
router.use("/tasks", taskRoutes);
router.use("/lectures", lectureRoutes)
router.use("/courses", courseRoutes);
router.use("/courses", progressRoutes);
router.use("/courses", taskProgressRoutes);

module.exports = router;