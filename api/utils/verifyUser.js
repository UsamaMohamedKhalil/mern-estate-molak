import jwt from 'jsonwebtoken';
import { errorHandeler } from './error.js';


export const verifyToken = (req, res, next) => {
  // Extract the token from the request cookies
  const token = req.cookies.access_token;

  // If token doesn't exist, return unauthorized error
  if (!token) return next(errorHandeler(401, 'Unauthorized'));

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If verification fails, return forbidden error
    if (err) return next(errorHandeler(403, 'Forbidden'));

    // If token is valid, attach user object to request and call next middleware
    req.user = user;
    next();
  });
};