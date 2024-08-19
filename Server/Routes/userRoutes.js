const { getAllUsers } = require("../Controllers/userController");
const {userPreferncesValidator} = require('../utils/validators/prefernecesValidatior');
const {getpreferneces, updatePreferences} = require('../Controllers/userPreferenecsController');
const protect = require("../middlewares/protect");

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/preferences", protect, getpreferneces);
router.put("/preferences", protect, userPreferncesValidator, updatePreferences);

module.exports = router;
