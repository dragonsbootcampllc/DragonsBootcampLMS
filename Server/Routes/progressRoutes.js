const express = require('express');
const { storeProgress, retrieveProgress } = require('../Controllers/userCourseProgressController');
const { protect } = require('../Controllers/authController');
const router = express.Router();

router.post('/courses/:courseId/progress', protect, storeProgress);
router.get('/courses/:courseId/progress', protect, retrieveProgress);

module.exports = router;
