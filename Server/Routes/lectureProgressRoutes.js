const {  markLectureAsAttended } = require('../Controllers/lectureController');
const protect = require("../middlewares/protect");
const router = require("express").Router();


// Route to update lecture progress
router.post("/attend", protect, markLectureAsAttended);

module.exports = router;
