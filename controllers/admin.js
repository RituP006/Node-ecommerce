const Product=require('../models/product');

exports.getAddProduct=(req, res, next) => {
    res.render('admin/edit-product', { docTitle: "Add Product" ,
    path:'/admin/add-product',
    editProduct:false,
});
}

exports.postAddedProduct=(req, res, next) => {  
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const description=req.body.description;
    const price=req.body.price;

    const product=new Product(null,title,imageUrl,description,price);
    product.save();
    res.redirect('/');
}

exports.getProducts=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('admin/products', { prods: products, docTitle: 'Admin Products' ,
        path:'/admin/products',});
    });
}

exports.getEditProduct=(req,res,next)=>{
    const edit = req.query.editMode;
    if(edit != 'true'){
        res.redirect('/');
        return;
    }
    const prodId = req.params['productId'];
    Product.getProductByID(prodId,product=>{

        if(!product){
            console.log("No product");

            return res.redirect('/');
        }
        res.render('admin/edit-product',{docTitle:'Edit Product', path:'/admin/edit-product',editProduct:true,product:product})
    });
}

exports.postEditProduct=(req,res,next)=>{
    const prodId = req.body.productId;
    const updatedTitle=req.body.title;
    const updatedImageUrl=req.body.imageUrl;
    const updatedDescription=req.body.description;
    const updatedPrice=req.body.price;

    const updatedProduct=new Product(prodId,updatedTitle,updatedImageUrl,updatedDescription,updatedPrice);
    updatedProduct.save();
    res.redirect('/products');
}


exports.postDeleteProduct=(req,res,next)=>{
    const prodId = req.body.productId;
    const price = req.body.price;
    console.log(prodId);
    Product.deleteProductById(prodId,price);
    res.redirect("/admin/products")
}