const {uploadTask, getTaskById, updateTask, deleteTaskById} = require('../Controllers/taskController');
const verifyRole = require('../utils/verifyRole');
const {taskValidator} = require('../utils/validators/taskValidator');
const router = require('express').Router();

router.post("/", verifyRole("educator"), taskValidator, uploadTask);
router.get("/:id", verifyRole("educator", "student"), getTaskById);
router.put("/:id", verifyRole("educator"), taskValidator, updateTask);
router.delete("/:id", verifyRole("educator"),deleteTaskById);

module.exports = router;