const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowFields) => {
  const newObject = {};
  Object.keys(obj).forEach((el) => {
    if (allowFields.includes(el)) newObject[el] = obj[el];
  });

  return newObject;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //  Create error if user post password data

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. please use / updateMyPassword",
        400
      )
    );
  }
  // Filter out unwanted fields names
  const filterBody = filterObj(req.body, "name", "email");

  //   Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    filterBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
//  Do not update password with this
exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
