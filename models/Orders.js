const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: 'pending' },
});

const Order = mongoose.model('Orders', orderSchema);
module.exports = Order;
