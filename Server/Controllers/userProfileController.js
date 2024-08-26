const expressAsyncHandler = require("express-async-handler");
const UserProfile = require("../Models/user_profile");
const PickExistVars = require("../utils/PickExistVars");

exports.getUserProfile = expressAsyncHandler(async (req, res, next) => {
  const user = req.user;

  let userProfile = await UserProfile.findOne({
    where: { userId: user.id },
    attributes: ["firstName", "lastName", "bio", "profilePicture"],
  });
  if (userProfile) {
    return res.status(200).json({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      bio: userProfile.bio,
      profilePicture: userProfile.profilePicture,
    });
  }

  // if there was no user profile create new one
  await UserProfile.create({
    userId: user.id,
  });

  userProfile = UserProfile.findOne({
    where: { userId: user.id },
    attributes: ["firstName", "lastName", "bio", "profilePicture"],
  });

  return res.status(201).json({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    bio: userProfile.bio,
    profilePicture: userProfile.profilePicture,
  });
});

exports.updateUserProfile = expressAsyncHandler(async (req, res, next) => {
  const user = req.user;
  const updatedValues = PickExistVars(req.body, [
    "firstName",
    "lastName",
    "bio",
    "profilePicture",
  ]);

  await UserProfile.update({ ...updatedValues },{where:{userId:user.id},returning:true});

  const userProfile = await UserProfile.findOne({
    where: { userId: user.id },
    attributes: ["firstName", "lastName", "bio", "profilePicture"],
  });

  return res.status(200).json(userProfile);
});
