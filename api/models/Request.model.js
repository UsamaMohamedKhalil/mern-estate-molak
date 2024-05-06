import mongoose from 'mongoose';

// Define the schema for the request model
const RequestSchema = new mongoose.Schema(
   {
      // Name of the request
      name: {
         type: String,
         required: true,
      },
      // City for the request
      city: {
         type: String,
         required: true,
      },
      // Maximum price for the property
      maxPrice: {
         type: Number,
         required: true,
      },
      // Area of the property
      area: {
         type: Number,
         required: true,
      },
      // Minimum price for the property
      minPrice: {
         type: Number,
         required: true,
      },
      // Whether the property is furnished or not
      furnished: {
         type: Boolean,
         required: true,
      },
      // Whether the property has parking or not
      parking: {
         type: Boolean,
         required: true,
      },
      // Type of the property (e.g., rent, sale)
      type: {
         type: String,
         required: true,
      },
      // Reference to the user who created the request
      userRef: {
         type: String,
         required: true,
      },
   },
   { timestamps: true } // Automatically add createdAt and updatedAt timestamps to documents
);

// Create the Request model
const Request = mongoose.model('Request',RequestSchema);

export default Request;
