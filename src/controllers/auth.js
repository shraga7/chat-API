import User from "../models/User";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/ErrorResponse";
import { sendTokenResponse } from "../utils/token";

// @desc Register User
// @route POST /api/v1/auth/register
// @access Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //create new user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
});

// @desc Login User
// @route POST /api/v1/auth/login
// @access Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // input validation
  if (!email || !password) {
    return next(new ErrorResponse("Email or password are missing", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // check if password matches
  const isMatch = await user.matchPasswords(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc Get current logged user
// @route GET /api/v1/auth/me
// @access Public
export const getLoggedUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});
