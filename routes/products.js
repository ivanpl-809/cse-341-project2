const express = require('express');
const router = express.Router();
const laundryItemController = require('../controllers/laundryItemController');

router.get('/', laundryItemController.getAllLaundryItems);
router.post('/', laundryItemController.createLaundryItem);
router.put('/:id', laundryItemController.updateLaundryItem);
router.delete('/:id', laundryItemController.deleteLaundryItem);

module.exports = router;
