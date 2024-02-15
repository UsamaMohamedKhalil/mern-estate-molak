import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from './routes/listing.route.js';
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
   console.log('connect to mongo db');
}).catch((err) => {
   console.log(err);
});
const app = express();
app.use(cookieParser());
app.use(express.json());
app.listen(3000, ()=>{
   console.log("Server is running on port 3000!!");
});

app.use("/api/user",userRouter);
app.use("/api/auth" , authRouter);
app.use("/api/listing" , listingRouter);

//Middleware
app.use((err,erq,res,next)=> {
const statusCode = err.statusCode || 500;
const message = err.message || 'Internal Server Error';
return res.status(statusCode).json({
   success: false,
   statusCode,
   message,
});

});