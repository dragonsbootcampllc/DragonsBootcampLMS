const { storeProgress, retrieveProgress } = require('../Controllers/userCourseProgressController');
const protect = require("../middlewares/protect");

const router = require("express").Router();

router.post("/:id/progress", protect, storeProgress);
router.get("/:id/progress", protect, retrieveProgress);

module.exports = router;
