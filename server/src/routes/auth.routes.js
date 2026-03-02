const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const { registerSchema, loginSchema, validate } = require('../middleware/validate.middleware');

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getUserProfile);

module.exports = router;
