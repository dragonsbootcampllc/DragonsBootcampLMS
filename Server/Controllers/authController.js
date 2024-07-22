const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const ApiError = require("../utils/ApiError");

// =========== Controllers ============
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  // ***** SEE: uncomment after the signup endpoint finished *****
  // if (!user || !(await bcrypt.compare(password, user.password_hash)))

  // ***** SEE: For Development env only *****
  if (!user || user.dataValues.password_hash !== password) {
    return next(new ApiError("Credentials are wrong!", 404));
  }

  const token = await jwt.sign(user.id, process.env.JWT_SECRET_KEY);
  res.status(200).json({ status: "success", token });
});

// @desc    (Authentication)
exports.protect = expressAsyncHandler(async (req, res, next) => {
  // 1) Check if token exist
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return next(new ApiError("you are not logged in"), 401);
  }
  const token = req.headers.authorization.split(" ")[1];
  //  2) verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // 3) check if user exist
  const user = await User.findById(decoded.userId);
  if (!user) {
    return next(
      new ApiError("user that belong to this token is no longer exist", 401)
    );
  }

  req.user = user;
  next();
});

// @desc    (Authorization)
exports.allowedTo = (...roles) =>
  expressAsyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 401)
      );
    }
    next();
  });
