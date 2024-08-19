const { getAllUsers } = require("../Controllers/userController");
const { protect } = require('../Controllers/authController');
const { userPreferncesValidator } = require('../utils/validators/prefernecesValidatior');
const { getpreferneces, updatePreferences } = require('../Controllers/userPreferenecsController');
const { getUserActivities, getUserActivity } = require('../Controllers/activitiesController');

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/preferences", protect, getpreferneces);
router.put("/preferences", protect, userPreferncesValidator, updatePreferences);

router.route('/activities').get(protect, getUserActivities);
router.route('/activities/:id').get(protect, getUserActivity);

module.exports = router;
