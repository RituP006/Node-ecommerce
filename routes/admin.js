const express = require('express');

const adminController=require('../controllers/admin');
const router = express.Router();

router.get('/add-product', adminController.getAddProduct);

router.get('/products',adminController.getProducts);
router.post('/product',adminController.postAddedProduct); // we can filter get post request like this
router.get('/edit-product',adminController.getEditProduct);

module.exports=router;