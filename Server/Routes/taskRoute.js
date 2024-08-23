const {uploadTask, getTaskById, updateTask, deleteTaskById, getRecentTask} = require('../Controllers/taskController');
const verifyRole = require('../utils/verifyRole');
const {taskValidator} = require('../utils/validators/taskValidator');
const protect = require('../middlewares/protect');
const router = require('express').Router();

router.get("/:id", verifyRole("educator", "student"), getTaskById);

// protected
router.post("/",protect, verifyRole("educator"), taskValidator, uploadTask);
router.put("/:id",protect, verifyRole("educator"), taskValidator, updateTask);
router.delete("/:id",protect,verifyRole("educator"),deleteTaskById);
router.get('/recent/:limit', protect, getRecentTask);

module.exports = router;     