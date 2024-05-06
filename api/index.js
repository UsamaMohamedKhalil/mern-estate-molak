import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from './routes/listing.route.js';
import requestRouter from './routes/request.route.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO).then(() => {
   console.log('Connected to MongoDB');
}).catch((err) => {
   console.log(err);
});

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Start the server
app.listen(3000, () => {
   console.log("Server is running on port 3000!!");
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/request", requestRouter);

// Error handling middleware
app.use((err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error';
   return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
   });
});
