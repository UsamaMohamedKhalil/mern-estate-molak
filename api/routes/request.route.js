// routes/request.routes.js

import express from "express";
import { createRequest, getRequest, getRequests, getRecommendations , deleteRequest} from '../controllers/request.controller.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Route to create a new request
router.post('/create', verifyToken, createRequest);

// Route to create a new request
router.delete('/delete/:id', verifyToken, deleteRequest);
// Route to get a request by ID
router.get('/get/:id', getRequest);

// Route to get all requests
router.get('/get', getRequests);

// Route to get recommendations for the user
router.get('/getRecommendations', verifyToken, getRecommendations);

export default router;
