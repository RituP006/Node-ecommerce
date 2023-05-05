const Product=require('../models/product');
const Cart=require('../models/cart');


exports.getProducts=(req, res, next) => {
   Product.fetchAll((products)=>{
        res.render('shop/product-list', { prods: products, docTitle: 'All Products' ,
        path:'/product-list',});
    });
    
}

exports.getProductDetail=(req,res,next)=>{
    const prodId=req.params.productId;
    Product.getProductByID(prodId,product=>{
        res.render("shop/product-detail",{docTitle:product.title,product:product,path:"/product-list"});

        });
}

exports.getIndex=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/index', { prods: products, docTitle: 'Shop' ,
      
        path:'/',});
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
      Product.fetchAll(products => {
        const cartProducts = [];
        for (product of products) {
          const cartProductData = cart.products.find(
            prod => prod.id === product.id
          );
          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          docTitle: 'Your Cart',
          products: cartProducts
        });
      });
    });
  };

exports.postCart=(req,res,next)=>{
    const productId = req.body.prodId;
    
   Product.getProductByID(productId,(product)=>{
        const productPrice =product.price;
        Cart.addProduct(productId,productPrice);
    });
   
    console.log(productId);
    res.redirect('/cart');
}


exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.getProductByID(prodId, product => {
      Cart.deleteProductfromCart(prodId, product.price);
      res.redirect('/cart');
    });
  };

exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{path:'/checkout', docTitle:'Checkout',})
}


exports.getOrder=(req,res,next)=>{
    res.render('shop/orders',{path:'/order', docTitle:'Orders',path:'/orders'})
}