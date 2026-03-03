const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getMyOrders,
    getOrders,
    updateOrderStatus
} = require('../controllers/order.controller');
const { protect, admin } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { orderSchema } = require('../utils/validationSchemas');

router.route('/')
    .post(protect, validate(orderSchema), addOrderItems)
    .get(protect, admin, getOrders);

router.get('/my', protect, getMyOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
