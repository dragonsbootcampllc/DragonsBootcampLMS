const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const { User } = require("../Models");
const jwt = require("jsonwebtoken");

const protect = expressAsyncHandler(async (req, res, next) => {
    let authorization = req.headers.authorization.replaceAll("\"","");
    console.log(authorization);
    // 1) Check if token exist
    if (
      !authorization ||
      !authorization.startsWith("Bearer ")
    ) {
      return next(new ApiError("you are not logged in"), 401);
    }
    const token = authorization.split(" ")[1];
    //  2) verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // 3) check if user exist
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return next(
        new ApiError("user that belong to this token is no longer exist", 401)
      );
    }
    if(!user.verified){
      return next(
        new ApiError("User is not verified", 401)
      );
    }
  
    //check if user changed their password after token was issued
  
    if (user.changedPasswordAfterTokenChanged(decoded.iat)) {
      return next(
        new ApiError("User recently updated there password!, Please log in again", 400)
      );
    }
  
    req.user = user;
    next();
  });

module.exports = protect;