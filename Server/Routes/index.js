const router = require('express').Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoute');
const courseRoutes = require('./courseRoutes');
const contentRoutes = require('./contentRoutes');
const tagRoutes = require('./tagRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use("/auth",authRoutes);
router.use("/user",userRoutes);
router.use("/tasks", taskRoutes);
router.use("/courses", courseRoutes);
router.use("/content", contentRoutes);
router.use("/tags", tagRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;