const {uploadLecture, updateLectureById, getLectuerById, deletelecture} = require('../Controllers/lectureController')
const verifyRole = require('../utils/verifyRole');
const lectureValidator = require('../utils/validators/lectureValidator')
const router = require('express').Router();

router.post("/",verifyRole('educator'), lectureValidator, uploadLecture);
router.get("/:id", verifyRole('educator', 'student'), getLectuerById);
router.put("/:id", lectureValidator, verifyRole('educator'), updateLectureById);
router.delete("/:id", verifyRole('educator'), deletelecture);

module.exports = router;