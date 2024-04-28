
import Request from "../models/Request.model.js";
import { errorHandeler } from "../utils/error.js";

export const createRequest = async (req, res, next) => {
    try {
        const request = await Request.create(req.body);
        return res.status(201).json(request);
    } catch (error) {
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

export const updateRequest = async (req, res, next) => {
    const request = await Request.findById(req.params.id);
    if (!request) {
        return next(errorHandeler(404, 'Request not found!'));
    }
    if (req.user.id !== request.userRef) {
        return next(errorHandeler(401, 'You can only update your own requests!'));
    }

    try {
        const updatedRequest = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedRequest);
    } catch (error) {
        next(error);
    }
};

export const getRequest = async (req, res, next) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return next(errorHandeler(404, 'Request not found!'));
        }
        res.status(200).json(request);
    } catch (error) {
        next(error);
    }
};

export const getRequests = async (req, res, next) => {
    try {
        const requests = await Request.find({});
        res.status(200).json(requests);
    } catch (error) {
        next(error);
    }
};
