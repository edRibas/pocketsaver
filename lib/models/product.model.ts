import mongoose from "mongoose";

// Define a Mongoose schema for the product
const productSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true, // Ensures that each product has a unique URL
  },
  currency: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  priceHistory: [
    {
      price: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now, // Sets the default value of the date to the current date and time
      },
    },
  ],
  lowestPrice: { type: Number },
  highestPrice: { type: Number },
  averagePrice: { type: Number },
  discountRate: { type: Number },
  description: { type: String },
  category: { type: String },
  reviewsCount: { type: Number },
  isOutOfStock: { type: Boolean, default: false }, // Default to false for the "isOutOfStock" field

  users: [
    {
      email: { type: String, required: true },
    },
  ], // An array of user emails associated with the product
}, { timestamps: true });

// Define a Mongoose model named "Product" based on the productSchema
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;