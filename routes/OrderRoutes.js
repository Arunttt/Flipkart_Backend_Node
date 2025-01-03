const express = require('express');
const router = express.Router();
const OrderController = require('../Controllers/OrderContoller');

router.post('/created', OrderController.createOrder);
router.get('/allOrder',OrderController.getAllOrder);
module.exports = router;
