// routes/request.routes.js

import express from "express";
import { createRequest, deleteRequest, updateRequest, getRequest, getRequests , getRecommendations } from '../controllers/request.controller.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create', verifyToken, createRequest);
router.delete('/delete/:id', verifyToken, deleteRequest);
router.post('/update/:id', verifyToken, updateRequest);
router.get('/get/:id', getRequest);
router.get('/get', getRequests);
router.get('/getRecommendations', verifyToken,getRecommendations);



export default router;
