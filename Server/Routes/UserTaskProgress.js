const { markTaskAsFinished } = require('../Controllers/taskController');
const protect = require("../middlewares/protect");
const router = require("express").Router();

// Route to update task progress
router.post("/finish",protect, markTaskAsFinished);



module.exports = router;
