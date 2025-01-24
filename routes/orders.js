const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err });
  }
});

// POST a new order
router.post('/', async (req, res) => {
  try {
    const { product, quantity, price } = req.body;
    if (!product || !quantity || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newOrder = new Order({ product, quantity, price });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err });
  }
});

// PUT (update) an order
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order', error: err });
  }
});

// DELETE an order
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting order', error: err });
  }
});

module.exports = router;
