const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  price: Number,
  discount: Number,
  baseMetal: String,
  polish: String,
  rating: Number,
  imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
