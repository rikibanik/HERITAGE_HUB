const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controller/orderController')
router.post('/booknow',authMiddleware.authUser ,orderController.createOrder);
router.post('/verify-payment', authMiddleware.authUser, orderController.verifyPayment)
module.exports = router;