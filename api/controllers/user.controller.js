import User from "../models/User.model.js";
import Listing from "../models/Listing.model.js";
import Request from '../models/Request.model.js';
import { errorHandeler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

// Test route to check if API routing is working
export const test = (req, res) => {
   res.json({
      message: 'API Routing Is Working',
   });
};

// Controller function to update a user's information
export const updateUser = async (req, res, next) => {
   // Check if the user is updating their own account
   if (req.user.id !== req.params.id)
      return next(errorHandeler(401, 'You can only update your own account!'));
   try {
      // If password is included in request body, hash it
      if (req.body.password) {
         req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      // Update user's information and return the updated user
      const updatedUser = await User.findByIdAndUpdate(
         req.params.id,
         {
            $set: {
               username: req.body.username,
               email: req.body.email,
               password: req.body.password,
               avatar: req.body.avatar,
            },
         },
         { new: true }
      );

      // Omit password from the response
      const { password, ...rest } = updatedUser._doc;
      // Send success response with updated user information
      res.status(200).json(rest);
   } catch (error) {
      // Pass any error to the error handler middleware
      next(error);
   }
};

// Controller function to delete a user account
export const deleteUser = async (req, res, next) => {
   // Check if the user is deleting their own account
   if (req.user.id !== req.params.id)
      return next(errorHandeler(401, 'You can only delete your own account!'));
   try {
      // Delete the user account
      await User.findByIdAndDelete(req.params.id);
      // Clear the access token cookie
      res.clearCookie('access_token');
      // Send success response
      res.status(200).json('User has been deleted!');
   } catch (error) {
      // Pass any error to the error handler middleware
      next(error);
   }
};

// Controller function to get listings of a user
export const getUserListings = async (req, res, next) => {
   // Check if the user is viewing their own listings
   if (req.user.id === req.params.id) {
      try {
         // Find listings created by the user
         const listings = await Listing.find({ userRef: req.params.id });
         // Send success response with the user's listings
         res.status(200).json(listings);
      } catch (error) {
         // Pass any error to the error handler middleware
         next(error);
      }
   } else {
      // If user is not viewing their own listings, return error
      return next(errorHandeler(401, 'You can only view your own listings!'));
   }
};

// Controller function to get requests of a user
export const getUserRequests = async (req, res, next) => {
   // Check if the user is viewing their own requests
   if (req.user.id === req.params.id) {
      try {
         // Find requests made by the user
         const requests = await Request.find({ userRef: req.params.id });
         // Send success response with the user's requests
         res.status(200).json(requests);
      } catch (error) {
         // Pass any error to the error handler middleware
         next(error);
      }
   } else {
      // If user is not viewing their own requests, return error
      return next(errorHandeler(401, 'You can only view your own requests!'));
   }
};

// Controller function to get user information
export const getUser = async (req, res, next) => {
   try {
      // Find the user by ID
      const user = await User.findById(req.params.id);
      // If user doesn't exist, return error
      if (!user) return next(errorHandler(404, 'User not found!'));
      // Omit password from the response
      const { password: pass, ...rest } = user._doc;
      // Send success response with user information
      res.status(200).json(rest);
   } catch (error) {
      // Pass any error to the error handler middleware
      next(error);
   }
};
