const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { type: Number, required: true }, 
});

module.exports = mongoose.model('Category', CategorySchema);
