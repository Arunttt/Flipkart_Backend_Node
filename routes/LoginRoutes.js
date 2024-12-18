const express = require('express');
const router = express.Router();

const loginControl = require('../Controllers/LoginController');

router.post('/register',loginControl.register);
router.post('/verify-otp',loginControl.verifyOtpAndSetPassword);
router.post('/login',loginControl.loginRemote);
module.exports = router;