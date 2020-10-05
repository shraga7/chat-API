import User from "../models/User";
import ErrorResponse from "../utils/ErrorResponse";
import asyncHandler from "./async";
import jwt from "jsonwebtoken";

// Protect route
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  const TOKEN = 1;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[TOKEN];
  }
  // make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          401
        )
      );
    }
    next();
  };
};
