import express from 'express';
import { google, signOut, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

// Route to handle user signup
router.post("/signup", signup);

// Route to handle user signin
router.post("/signin", signin);

// Route to handle Google authentication
router.post("/google", google);

// Route to handle user signout
router.get('/signout', signOut);

export default router;
