import express from 'express';
import { deleteUser, test, updateUser, getUserListings, getUser, getUserRequests } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Route to test the user controller
router.get('/test', test);

// Route to update user information by ID
router.post('/update/:id', verifyToken, updateUser);

// Route to delete user account by ID
router.delete('/delete/:id', verifyToken, deleteUser);

// Route to get listings of a user by ID
router.get('/listings/:id', verifyToken, getUserListings);

// Route to get requests of a user by ID
router.get('/requests/:id', verifyToken, getUserRequests);

// Route to get user information by ID
router.get('/:id', verifyToken, getUser);

export default router;
