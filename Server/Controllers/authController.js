
const {User} = require('../Models/index.js');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

exports.SignUp = async(req, res, next) => {
    const {username, email, role, password} = req.body;
    if (!username || !password || !role || !email) {
        return res.status(400).json({ error: 'All fields are required' });
      }
    //validate username
    const name_not_taken = await User.findOne({ 
        where: { 
        username,
    }
    });
    if (name_not_taken) {
        return res.status(400).json({message: `username is already not taken`});
    }
    //validate email
    const email_not_taken = await User.findOne({ 
        where: {
        email,
    }
    });
    if(email_not_taken) {
        return res.status(400).json({message: `you already have an account try logging in`});
    }
    //hash the password
    const password_hash = await bcrypt.hash(password, 12);
    //create the new user and save to the database
    try {
       const user = await User.create({username, 
        password_hash, 
        email, 
        role, 
    });
       return res.status(201).json({id: user.id});
    } catch(err) {
        return res.status(500).json({
        message: `${err.message}`
        });
    }
}

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
exports.protect = asyncHandler(async (req, res, next) => {
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
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 401)
      );
    }
    next();
  });

