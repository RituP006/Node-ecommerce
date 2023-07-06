const express = require('express');

const adminController=require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-product',isAuth, adminController.getAddProduct);

router.get('/products',isAuth,adminController.getProducts);
router.post('/add-product',isAuth,adminController.postAddProduct); // we can filter get post request like this
router.get('/edit-product/:productId',isAuth,adminController.getEditProduct);
router.post('/delete-product',isAuth,adminController.postDeleteProduct);
router.post('/edit-product',isAuth,adminController.postEditProduct);

module.exports=router;