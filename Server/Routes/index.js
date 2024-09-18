const router = require('express').Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoute');
const activitiesRoutes = require('./activitiesRoutes');
const lectureRoutes = require('./lectureRoutes');
const courseRoutes = require('./courseRoutes');
const tagRoutes = require('./tagRoutes');
const categoryRoutes = require('./categoryRoutes');
const chatRoutes = require('./chatRouters');
const discussionRoutes = require('./discussionRoutes');

router.use("/auth",authRoutes);
router.use("/user",userRoutes);
router.use("/tasks", taskRoutes);
router.use("/activities", activitiesRoutes);
router.use("/lectures", lectureRoutes)
router.use("/courses", courseRoutes);
router.use("/tags", tagRoutes);
router.use("/categories", categoryRoutes);
router.use('/chat', chatRoutes);
router.use("/discussion", discussionRoutes);

module.exports = router;