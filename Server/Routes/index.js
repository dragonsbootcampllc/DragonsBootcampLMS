const router = require('express').Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoute');
const lectureRoutes = require('./lectureRoutes');

router.use("/auth",authRoutes);
router.use("/user",userRoutes);
router.use("/tasks", taskRoutes);
router.use("/lectures", lectureRoutes)

module.exports = router;