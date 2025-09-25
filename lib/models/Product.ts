import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  category: String,
  image: String,
  price: Number,
  discountedPrice: Number,
  stock: Number,
  rating: {
    rate: Number,
    count: Number,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
