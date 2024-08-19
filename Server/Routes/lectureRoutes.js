const {uploadLecture, updateLectureById, getLectureById, deleteLecture} = require('../Controllers/lectureController')
const contentRoutes = require('./contentRoutes');
const verifyRole = require('../utils/verifyRole');
const lectureValidator = require('../utils/validators/lectureValidator');
const protect = require('../middlewares/protect');
const router = require('express').Router();


router.get("/:id", verifyRole('educator', 'student'), getLectureById);

//protected
router.post("/",protect,verifyRole('educator'), lectureValidator, uploadLecture);
router.put("/:id",protect, verifyRole('educator'), updateLectureById);
router.delete("/:id",protect, verifyRole('educator'), deleteLecture);

// Lecture's Content Routes
router.use("/:lectureId/content", contentRoutes);

module.exports = router;