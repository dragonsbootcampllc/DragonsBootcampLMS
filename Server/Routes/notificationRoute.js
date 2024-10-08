const {readNotification, getAllNotifications} = require("../Controllers/notificationsController")
const protect = require('../middlewares/protect');
const verifyRole = require('../utils/verifyRole');
const router = require('express').Router();

router.put("/read", protect, readNotification);
router.get("/", protect, getAllNotifications);

module.exports = router;
