import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema(
   {
   name: {
      type: String,
      required: true,
   },
   city: {
      type: String,
      required: true,
   },
   maxPrice: {
      type: Number,
      required: true,
   },
   Area: {
    type: Number,
    required: true,
 },
   mintPrice: {
      type: Number,
      required: true,
   },
   furnished: {
      type: Boolean,
      required: true,
   },
   parking: {
      type: Boolean,
      required: true,
   },
   type: {
      type: String,
      required: true,
   },
   userRef: {
      type: String,
      required: true,
   },
   },
   { timestamps: true }
 );



const Request = mongoose.model('Request',RequestSchema);

export default Request;