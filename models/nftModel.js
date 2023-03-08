const mongoose = require("mongoose");
const validator = require("validator");

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "NFT must have a name"],
    unique: true,
    trim: true,
    // validate: [validator.isAlpha, "NFT must only contain caracters"],
  },
  ratingAverage: {
    type: Number,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "NFT must have a price"],
  },
  discount: Number,
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("NFT", nftSchema);
