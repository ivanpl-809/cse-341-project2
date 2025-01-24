const LaundryItem = require('../models/LaundryItem');

// GET all laundry items
const getAllLaundryItems = async (req, res) => {
  try {
    const items = await LaundryItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new laundry item
const createLaundryItem = async (req, res) => {
  const { name, pricePerUnit, category } = req.body;

  if (!name || !pricePerUnit || !category) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const item = new LaundryItem({ name, pricePerUnit, category });
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT to update a laundry item
const updateLaundryItem = async (req, res) => {
  const { id } = req.params;
  const { name, pricePerUnit, category } = req.body;

  try {
    const updatedItem = await LaundryItem.findByIdAndUpdate(id, { name, pricePerUnit, category }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Laundry item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a laundry item
const deleteLaundryItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await LaundryItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Laundry item not found' });
    }
    res.json({ message: 'Laundry item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllLaundryItems, createLaundryItem, updateLaundryItem, deleteLaundryItem };
