const {uploadLecture, updateLectureById, getLectuerById, deletelecture} = require('../Controllers/lectureController')
const verifyRole = require('../utils/verifyRole');
const lectureValidator = require('../utils/validators/lectureValidator');
const protect = require('../middlewares/protect');
const router = require('express').Router();


router.get("/:id", verifyRole('educator', 'student'), getLectuerById);

//protected
router.post("/",protect,verifyRole('educator'), lectureValidator, uploadLecture);
router.put("/:id",protect, verifyRole('educator'), updateLectureById);
router.delete("/:id",protect, verifyRole('educator'), deletelecture);

module.exports = router;