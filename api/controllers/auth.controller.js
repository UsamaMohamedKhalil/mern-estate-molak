import User from '../models/User.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandeler } from '../utils/error.js';

// Controller function for user signup
export const signup = async (req, res, next) => {
   // Extract username, email, and password from request body
   const { username, email, password } = req.body;
   // Hash the password
   const hashPassword = bcryptjs.hashSync(password, 10);
   // Create a new user instance with hashed password
   const newUser = new User({ username, email, password: hashPassword });
   try {
      // Save the new user to the database
      await newUser.save();
      // Send success response
      res.status(201).json("User Created Successfully");
   } catch (error) {
      // Pass any error to the error handler middleware
      next(error);
   }
};

// Controller function for user signin
export const signin = async (req, res, next) => {
   // Extract email and password from request body
   const { email, password } = req.body;
   try {
      // Find user by email
      const validUser = await User.findOne({ email });
      // If user not found, return error
      if (!validUser) return next(errorHandeler(404, 'User not found!'));
      // Compare passwords
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      // If password is invalid, return error
      if (!validPassword) return next(errorHandeler(401, 'Wrong credentials'));
      // Generate JWT token
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      // Omit password from user object before sending response
      const { password: pass, ...rest } = validUser._doc;
      // Set token as a cookie and send user details in response
      res
         .cookie('access_token', token, { httpOnly: true })
         .status(200)
         .json(rest);
   } catch (error) {
      // Pass any error to the error handler middleware
      next(error);
   }
};

// Controller function for user signin with Google
export const google = async (req, res, next) => {
   try {
      // Check if user exists by email
      const user = await User.findOne({ email: req.body.email });
      if (user) {
         // If user exists, generate JWT token
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
         // Omit password from user object before sending response
         const { password: pass, ...rest } = user._doc;
         // Set token as a cookie and send user details in response
         res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
      } else {
         // If user doesn't exist, generate a random password, hash it, and create a new user
         const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
         const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
         const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo });
         await newUser.save();
         // Generate JWT token for the new user
         const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
         // Omit password from user object before sending response
         const { password: pass, ...rest } = newUser._doc;
         // Set token as a cookie and send user details in response
         res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
      }
   } catch (error) {
      // Pass any error to the error handler middleware
      next(error);
   }
};

// Controller function for user signout
export const signOut = async (req, res, next) => {
   try {
      // Clear the access token cookie
      res.clearCookie('access_token');
      // Send success response
      res.status(200).json('User Has Been Logged Out!');
   } catch (error) {
      // Pass any error to the error handler middleware
      next(error);
   }
};
