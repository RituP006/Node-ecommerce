const Product=require('../models/product');
const Cart=require('../models/cart');


exports.getProducts=(req, res, next) => {
    Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        docTitle: 'All Products',
        path: '/product-list'
      });
    })
    .catch(err => {
      console.log(err);
    }); 
}

exports.getProductDetail=(req,res,next)=>{
    const prodId=req.params.productId;
    // Product.findById(prodId,product=>{
    //     res.render("shop/product-detail",{docTitle:product.title,product:product,path:"/product-list"});
    //     });

    Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        docTitle: product.title,
        path: '/product-list'
      });
    })
    .catch(err => console.log(err));
}

exports.getIndex=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/index', { prods: products, docTitle: 'Shop' ,
      
        path:'/',});
    });
}

exports.getCart = (req, res, next) => {
   req.user.getCart().then(products=>{
    res.render('shop/cart', {
      path: '/cart',
      docTitle: 'Your Cart',
      products: products
    });
   }).catch(error=>console.log(error));  
    
  };

exports.postCart = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};


exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{path:'/checkout', docTitle:'Checkout',})
}


exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        docTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

