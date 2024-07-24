const { getAllUsers } = require("../Controllers/userController");

const router = require("express").Router();

router.get("/", getAllUsers);

module.exports = router;