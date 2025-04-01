// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price must be positive']
  },
  images: [
    {
      type: String,
      required: [true, 'Please provide at least one product image']
    }
  ],
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'Jewelry',
      'Clothing',
      'Home Decor',
      'Art',
      'Furniture',
      'Accessories',
      'Beauty & Personal Care',
      'Food & Drinks',
      'Toys & Games',
      'Other'
    ]
  },
  materials: [String],
  customizable: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Number,
    required: [true, 'Please provide the stock amount'],
    min: [0, 'Stock cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);