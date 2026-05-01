const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  type: {
    type: String,
    required: [true, 'Please provide property type'],
    enum: ['house', 'apartment', 'condo', 'villa', 'commercial', 'land']
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending', 'rented'],
    default: 'available'
  },
  bedrooms: {
    type: Number,
    default: 0
  },
  bathrooms: {
    type: Number,
    default: 0
  },
  sqft: {
    type: Number,
    default: 0
  },
  yearBuilt: {
    type: Number
  },
  images: [{
    type: String,
    required: true
  }],
  features: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  agent: {
    name: String,
    email: String,
    phone: String,
    image: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for search
propertySchema.index({ title: 'text', description: 'text', 'location.city': 'text' });

module.exports = mongoose.model('Property', propertySchema);

