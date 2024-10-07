const asyncHandler = require('express-async-handler');
const {User} = require('../Models/index.js');

exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.findAll();

    res.status(200).json(users);
});

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.user.id,{attributes:["id","username", "email","role"]});
    res.status(200).json(user);
});