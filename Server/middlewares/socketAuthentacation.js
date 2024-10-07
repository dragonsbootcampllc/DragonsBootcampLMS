const jwt = require('jsonwebtoken');
const ApiError = require("../utils/ApiError")
const {User} = require('../Models/index')
const asyncHandler = require('express-async-handler')

const authenticate = (socket, next) => {
    const token = socket.handshake.headers.token;

    if (!token) {
        return next(
            new ApiError("User not authenticated", 400)
        );
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, asyncHandler(async(err, decoded) => {
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return next(
                new ApiError("User that belongs to this token is no longer exist", 401)
            )
        }
        if (!user.verified) {
            return next(new ApiError("User is not verified", 401))
        }

        if (user.changedPasswordAfterTokenChanged(decoded.iat)) {
            return next(
              new ApiError(
                "User recently updated there password!, Please log in again", 
                400
              )
            );
        }
        if (err) {
            return next(
                new ApiError(err.message, 500)
            );
        }
        socket.user = decoded;
        next();
    })
    )}

module.exports = authenticate;