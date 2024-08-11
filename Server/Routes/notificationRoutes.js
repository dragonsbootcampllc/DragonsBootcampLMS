const {sendNotification, sendAllNotifications,pdateNotitification, getNotificationsByUser, getAllNotifications, saveFcmToken} = require('../Controllers/notificationController');
const verifyRole = require('../utils/verifyRole');
const {notificationValidator} = require('../utils/validators/notificationValidator');
const router = require('express').Router();


router.post("/fcmToken", saveFcmToken);
router.post("/all", verifyRole("educator"), notificationValidator, sendAllNotifications);
router.post("/", verifyRole("educator"), notificationValidator, sendNotification);
router.put("/:id/read", updateNotitification);
router.get("/:userId/:read", getNotificationsByUser);
router.get("/", getAllNotifications);


module.exports = router;
