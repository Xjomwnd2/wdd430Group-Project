// models/SellerProfile.js
import mongoose from 'mongoose';

const SellerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shopName: {
    type: String,
    required: [true, 'Please provide a shop name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Shop name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a shop description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  story: {
    type: String,
    maxlength: [5000, 'Story cannot be more than 5000 characters']
  },
  profileImage: {
    type: String
  },
  location: {
    type: String
  },
  socialLinks: {
    website: String,
    instagram: String,
    facebook: String,
    twitter: String,
    etsy: String
  }
}, { timestamps: true });

export default mongoose.models.SellerProfile || mongoose.model('SellerProfile', SellerProfileSchema);