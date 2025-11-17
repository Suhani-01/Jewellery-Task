const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: String
});

module.exports = mongoose.model('Category', categorySchema);
