const express = require('express');
const path = require('path'); //allow us to set  path of serving html pages


// import products
const shopController = require('../controllers/shop');

const router = express.Router();    1   

router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productId',shopController.getProductDetail);

router.get('/cart',shopController.getCart);

router.get('/checkout',shopController.getCheckout);

router.get('/orders',shopController.getOrder);

module.exports = router;