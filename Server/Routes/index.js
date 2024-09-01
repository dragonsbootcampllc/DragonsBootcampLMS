const router = require('express').Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoute');
const activitiesRoutes = require('./activitiesRoutes');
const lectureRoutes = require('./lectureRoutes');
const courseRoutes = require('./courseRoutes');
const tagRoutes = require('./tagRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use("/auth",authRoutes);
router.use("/user",userRoutes);
router.use("/tasks", taskRoutes);
router.use("/activities", activitiesRoutes);
router.use("/lectures", lectureRoutes)
router.use("/courses", courseRoutes);
router.use("/tags", tagRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;