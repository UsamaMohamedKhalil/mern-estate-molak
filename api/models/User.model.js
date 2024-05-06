import mongoose from "mongoose";

// Define the schema for the user model
const userSchema = new mongoose.Schema({
   // Username field
   username: {
      type: String,
      required: true,
      unique: true, // Username must be unique
   },
   // Email field
   email: {
      type: String,
      required: true,
      unique: true, // Email must be unique
   },
   // Password field
   password: {
      type: String,
      required: true,
   },
   // Avatar field with default image URL
   avatar:{
      type:String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
   },
}, {timestamps : true }); // Automatically add createdAt and updatedAt timestamps to documents

// Create the User model
const User = mongoose.model('User',userSchema);

export default User;
