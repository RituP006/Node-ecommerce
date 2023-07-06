const express = require('express');
// const path = require('path'); //allow us to set  path of serving html pages
const isAuth = require('../middleware/is-auth');


// import products
const shopController = require('../controllers/shop');

const router = express.Router();    1   

router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productId',isAuth,shopController.getProductDetail);

router.get('/cart',isAuth,shopController.getCart);

router.post('/cart',isAuth,shopController.postCart);

router.post('/cart-delete-item',isAuth, shopController.postCartDeleteProduct);

router.post('/create-order',isAuth, shopController.postOrder);

router.get('/orders',isAuth,shopController.getOrders);

module.exports = router;