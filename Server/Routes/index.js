const router = require('express').Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoute');
const activitiesRoutes = require('./activitiesRoutes');
const lectureRoutes = require('./lectureRoutes');
const courseRoutes = require('./courseRoutes');

router.use("/auth",authRoutes);
router.use("/user",userRoutes);
router.use("/tasks", taskRoutes);
router.use("/activities", activitiesRoutes);
router.use("/lectures", lectureRoutes)
router.use("/courses", courseRoutes);

module.exports = router;