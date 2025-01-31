const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Orders');

// Apply middleware to all routes in this file
router.use(authMiddleware);

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err });
  }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order', error: err });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { product, quantity, totalPrice } = req.body;
    if (!product || !quantity || !totalPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newOrder = new Order({ product, quantity, totalPrice });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err });
  }
});

// Update an order by ID
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

// Delete an order by ID
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