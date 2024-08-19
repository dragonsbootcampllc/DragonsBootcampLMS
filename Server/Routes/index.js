const router = require('express').Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoute');
<<<<<<< HEAD
const activitiesRoutes = require('./activitiesRoutes');
=======
const lectureRoutes = require('./lectureRoutes');
const courseRoutes = require('./courseRoutes');
const progressRoutes = require('./progressRoutes'); 
>>>>>>> origin/Sprent-2

router.use("/auth",authRoutes);
router.use("/user",userRoutes);
router.use("/tasks", taskRoutes);
<<<<<<< HEAD
router.use("/activities", activitiesRoutes);
=======
router.use("/lectures", lectureRoutes)
router.use("/courses", courseRoutes);
router.use("/courses", progressRoutes);
>>>>>>> origin/Sprent-2

module.exports = router;