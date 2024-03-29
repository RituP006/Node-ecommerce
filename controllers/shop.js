const Product=require('../models/product');
const Order=require('../models/order');


exports.getProducts=(req, res, next) => {
    Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        docTitle: 'All Products',
        path: '/product-list',
      });
    })
    .catch(err => {
      console.log(err);
    }); 
}

exports.getProductDetail=(req,res,next)=>{
    const prodId=req.params.productId;
    Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        docTitle: product.title,
        path: '/product-list',
      });
    })
    .catch(err => console.log(err));
}

exports.getIndex=(req,res,next)=>{
    Product.find().then((products)=>{
      res.render('shop/index', { prods: products, docTitle: 'Shop' ,
      path:'/',
    });
  });
}

exports.getCart = (req, res, next) => {
   req.user.populate("cart.items.productId").then(user=>{
    const products = user.cart.items;
    res.render('shop/cart', {
      path: '/cart',
      docTitle: 'Your Cart',
      products: products,
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

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        docTitle: 'Your Orders',
        orders: orders,
      });
    })
    .catch(err => console.log(err));
};


