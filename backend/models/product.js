const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [500, "Product name cannot exceed 500 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [9, "Product price cannot exceed 5 characters"],
    default: 0.0,
  },
  discount: {
    type: Number,
    required: [true, "Please enter product discount"],
    maxLength: [3, "Product discount cannot exceed 5 characters"],
    default: 0,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter product discountPrice"],
    maxLength: [9, "Product discountPrice cannot exceed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
    maxLength: [15000, "Product description cannot exceed 1500 characters"],
  },
  ratings: { 
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please select correct category for product",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter the product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the product seller"],
    maxLength: [5, "Product stock cannot exceed 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user:{
    type: mongoose.Schema.ObjectId,
    ref:'User',
    required:true
  }, 
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Product", productSchema);
