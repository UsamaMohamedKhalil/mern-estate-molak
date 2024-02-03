import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
   console.log('connect to mongo db');
}).catch((err) => {
   console.log(err);
});
const app = express();

app.listen(3000, ()=>{
   console.log("Server is running on port 3000!!");
});

app.use("/api/user",userRouter);