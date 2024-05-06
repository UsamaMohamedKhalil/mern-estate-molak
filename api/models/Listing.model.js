import mongoose from 'mongoose';

// Define the schema for the listing model
const listingSchema = new mongoose.Schema(
   {
      // Name of the listing
      name: {
         type: String,
         required: true,
      },
      // Phone number of the listing owner
      phoneNumber: {
         type: String,
         required: true,
      },
      // WhatsApp numbers of the listing owner
      whatsappNumbers: {
         type: String,
         required: true,
      },
      // Description of the listing
      description: {
         type: String,
         required: true,
      },
      // City where the property is located
      city: {
         type: String,
         required: true,
      },
      // Address of the property
      address: {
         type: String,
         required: true,
      },
      // Regular price of the property
      regularPrice: {
         type: Number,
         required: true,
      },
      // Area of the property
      area: {
         type: Number,
         required: true,
      },
      // Discounted price of the property
      discountPrice: {
         type: Number,
         required: true,
      },
      // Number of bathrooms in the property
      bathrooms: {
         type: Number,
         required: true,
      },
      // Number of bedrooms in the property
      bedrooms: {
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
      // Whether there is an offer on the property
      offer: {
         type: Boolean,
         required: true,
      },
      // URLs of images associated with the listing
      imageUrls: {
         type: Array,
         required: true,
      },
      // Reference to the user who owns the listing
      userRef: {
         type: String,
         required: true,
      },
   },
   { timestamps: true } // Automatically add createdAt and updatedAt timestamps to documents
);

// Create the Listing model
const Listing = mongoose.model('Listing',listingSchema);

export default Listing;
