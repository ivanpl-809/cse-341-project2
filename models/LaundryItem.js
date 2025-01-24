const mongoose = require('mongoose');

const laundryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pricePerUnit: { type: Number, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model('LaundryItem', laundryItemSchema);
