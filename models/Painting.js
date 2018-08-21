const mongoose = require('mongoose');

const PaintingSchema = new mongoose.Schema({
  name: String,
  url: String,
  technique: String
});

module.exports = mongoose.model('Painting', PaintingSchema);
