const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');


router.get('/', OrderController.getAllOrders);

router.post('/', OrderController.createOrder);

router.put('/:id', OrderController.updateOrder);

router.delete('/:id', OrderController.deleteOrder);

module.exports = router;
