const { getAllUsers } = require("../Controllers/userController");
const protect = require('../middlewares/protect');
const { userPreferncesValidator } = require('../utils/validators/prefernecesValidatior');
const { getpreferneces, updatePreferences } = require('../Controllers/userPreferenecsController');
const { getUserActivities, getUserActivity } = require('../Controllers/activitiesController');

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/preferences", protect, getpreferneces);
router.put("/preferences", protect, userPreferncesValidator, updatePreferences);

router.get('/activities',protect, getUserActivities);
router.get('/activities/:id',protect, getUserActivity);

module.exports = router;
