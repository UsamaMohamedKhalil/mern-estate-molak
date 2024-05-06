import Request from "../models/Request.model.js";
import { errorHandeler } from "../utils/error.js";
import Listing from "../models/Listing.model.js";

// Controller function to create a new request
export const createRequest = async (req, res, next) => {
    try {
        // Create a new request using data from request body
        const request = await Request.create(req.body);
        // Send success response with the created request
        return res.status(201).json(request);
    } catch (error) {
        // Pass any error to the error handler middleware
        next(error);
    }
};



// Controller function to get a request by ID
export const getRequest = async (req, res, next) => {
    try {
        // Find the request by ID
        const request = await Request.findById(req.params.id);
        // If request doesn't exist, return error
        if (!request) {
            return next(errorHandeler(404, 'Request not found!'));
        }
        // Send success response with the request
        res.status(200).json(request);
    } catch (error) {
        // Pass any error to the error handler middleware
        next(error);
    }
};

// Controller function to get all requests
export const getRequests = async (req, res, next) => {
    try {
        // Find all requests
        const requests = await Request.find({});
        // Send success response with all requests
        res.status(200).json(requests);
    } catch (error) {
        // Pass any error to the error handler middleware
        next(error);
    }
};

// Controller function to get recommendations for the user based on their requests
export const getRecommendations = async (req, res, next) => {
    try {
        // Retrieve user's requests
        const userRequests = await Request.find({ userRef: req.user.id });

        // Initialize an array to store recommendations for each request
        const recommendations = [];

        // Iterate over each user request
        for (const request of userRequests) {
            // Determine criteria based on the user's request
            const criteria = {
                city: request.city,              
                furnished: request.furnished,
                parking: request.parking,
                type: request.type,
            };

            // Find listings that match the request criteria
            const listings = await Listing.find(criteria);

            // Add the matched listings to recommendations array
            recommendations.push({
                request: request,
                listings: listings
            });
        }

        // Return recommendations for each request
        if (recommendations.length === 0) {
            res.status(404).json({ message: "No recommendations found" });
        } else {
            res.status(200).json(recommendations);
        }
    } catch (error) {
        // Pass any error to the error handler middleware
        next(error);
    }
};

export const deleteRequest = async (req, res, next) => {
    const request = await Request.findById(req.params.id);

    if (!request) {
        return next(errorHandeler(404, 'Request not found'));
    }
    if (req.user.id !== request.userRef.toString()) {
        return next(errorHandeler(401, 'You can only delete your own requests!'));
    }
    try {
        await Request.findByIdAndDelete(req.params.id);
        res.status(200).json('Request has been deleted');
    } catch (error) {
        next(error);
    }
};