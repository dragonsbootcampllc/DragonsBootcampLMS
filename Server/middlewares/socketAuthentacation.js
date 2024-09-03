const jwt = require('jsonwebtoken');
const ApiError = require("../utils/ApiError")
const authenticate = (socket, next) => {
    const token = socket.handshake.headers.token;

    if (!token) {
        return next(
            new ApiError("User not authenticated", 400)
        );
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        //todo: should i check if the user exists and verified or is itn't nessecary?
        if (err) {
            return next(
                new ApiError(err.message, 500)
            );
        }
        socket.user = decoded;
        next();
    })
}

module.exports = authenticate;