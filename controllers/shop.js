const Product=require('../models/product');





exports.getProducts=(req, res, next) => {
   Product.fetchAll((products)=>{
        res.render('shop/product-list', { prods: products, docTitle: 'All Products' ,
        path:'/product-list',});
    });
    
}

exports.getProductDetail=(req,res,next)=>{
    const prodId=req.params.productId;
    console.log(prodId);
}

exports.getIndex=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/index', { prods: products, docTitle: 'Shop' ,
      
        path:'/',});
    });
}

exports.getCart=(req,res,next)=>{
    res.render('shop/cart',{docTitle:'Your Cart',path:'/cart',});
}

exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{path:'/checkout', docTitle:'Checkout',})
}


exports.getOrder=(req,res,next)=>{
    res.render('shop/orders',{path:'/order', docTitle:'Orders',path:'/orders'})
}