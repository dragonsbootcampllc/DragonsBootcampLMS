const {calculateAverageTaskProgress} = require('../Controllers/taskProgressController');
const protect = require('../middlewares/protect');
const router = require('express').Router();

router.get("/:courseId/tasks/progress", protect, calculateAverageTaskProgress);

module.exports = router;