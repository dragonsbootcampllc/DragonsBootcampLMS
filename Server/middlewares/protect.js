const ApiError = require("../utils/ApiError");
const { User } = require("../Models");
const jwt = require("jsonwebtoken");

/**
 * @function protect
 * @summary This middleware function is used to protect routes that require authentication
 */

const protect = async (req, res, next) => {
  // 1) Check if token exist
  let authorization = req.headers.authorization || req.authorization;
  if (!authorization || !authorization) {
    return next(new ApiError("There is no Token Attatched"), 401);
  }
  if (!authorization.startsWith("Bearer ")) {
    return next(new ApiError("The Token is not Bearer Token"), 401);
  }
  const token = authorization.replaceAll('"', "").split(" ")[1];

  if (!token) {
    return next(new ApiError("There is no Token Attatched"), 401);
  }

  //  2) verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) check if user exist
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return next(
        new ApiError("user that belong to this token is no longer exist", 401)
      );
    }
    if (!user.verified) {
      return next(new ApiError("User is not verified", 401));
    }

    //check if user changed their password after token was issued

    if (user.changedPasswordAfterTokenChanged(decoded.iat)) {
      return next(
        new ApiError(
          "User recently updated there password!, Please log in again",
          400
        )
      );
    }
    req.user = user;
    next();
  } catch (e) {
    return next(new ApiError("Invalid Token", 401));
  }
};

module.exports = protect;
