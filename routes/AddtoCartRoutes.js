const express = require('express');
const router = express.Router();
const  AddtoCartController  = require('../Controllers/AddtoCartController');

router.post("/created", AddtoCartController.createCart);
router.post("/getData", AddtoCartController.getDisabledProductsByUserId);
module.exports = router;