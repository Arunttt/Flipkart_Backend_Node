const express = require('express');
const router = express.Router();
const  AddtoCartController  = require('../Controllers/AddtoCartController');

router.post("/created", AddtoCartController.createCart);
router.post("/getData", AddtoCartController.getDisabledProductsByUserId);
router.get('/product/:id', AddtoCartController.getProductById);
router.delete('/productDelete/:id', AddtoCartController.deleteProduct)

module.exports = router;