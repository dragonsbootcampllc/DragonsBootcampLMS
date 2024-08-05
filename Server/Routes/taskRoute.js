const {uploadTask, getTaskById, getAllTasksForLecture, updateTask, deleteTaskById} = require('../Controllers/taskController');
const verifyRole = require('../utils/verifyRole');
const {taskValidator} = require('../utils/validators/taskValidator');
const router = require('express').Router();

router.post("/upload", verifyRole("educator"), taskValidator, uploadTask);
router.get("/:id", verifyRole("educator", "student"), getTaskById);
router.get("/allTasks/:lectureId", verifyRole("educator", "student"), getAllTasksForLecture);
router.put("/update/:id", verifyRole("educator"), taskValidator, updateTask);
router.delete("/delete/:id", verifyRole("educator"),deleteTaskById);

module.exports = router;