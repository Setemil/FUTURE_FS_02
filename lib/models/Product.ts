import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
      id: String,
  name: String,
  price: Number,
  diScountedPrice: Number,
  deScription: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
  Stock: Number,
  createdAt: String,
  updatedAt: String,
})

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);