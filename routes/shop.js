const express = require('express');
const path = require('path'); //allow us to set  path of serving html pages


// import products
const shopController = require('../controllers/shop');

const router = express.Router();    1   

router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productId',shopController.getProductDetail);

router.get('/cart',shopController.getCart);

router.post('/cart',shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders',shopController.getOrders);

module.exports = router;