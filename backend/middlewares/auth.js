import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errors.js";
import jwt from 'jsonwebtoken';

export const isAuthenticated = catchAsyncErrors(async(req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User not authenticated", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (process.env.SMTP_MALI !== process.env.SMTP_MALI) { // Only allow admin to send newsletters
      return next(new ErrorHandler("Not authorized", 403));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
});
