const {User} = require('../Models/index.js');

exports.getAllUsers = async function (req, res) {
    const users = await User.findAll();

    res.status(200).json(users);
}