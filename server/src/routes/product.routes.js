const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const validate = require('../middleware/validate.middleware');
const { productSchema } = require('../utils/validationSchemas');

router.route('/')
    .get(getProducts)
    .post(protect, admin, validate(productSchema), createProduct);

router.route('/:id')
    .get(getProductById)
    .put(protect, admin, validate(productSchema), updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;
