const fs=require('fs');
const path=require('path');

const p=path.join(path.dirname(require.main.filename),'data','cart.json');   

module.exports = class Cart{
    static addProduct(id, productPrice){

        //fetch items from cart
        fs.readFile(p,(err,fileContent)=>{
            let cart = {products:[],totalPrice:0};
            if(!err && fileContent.length !=0){
                cart = JSON.parse(fileContent);
            }

            //find if the product exist
            const existingProductIndex = cart.products.findIndex((p => p.id===id));
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty +1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = {id:id,qty:1};
                cart.products.push(updatedProduct);
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p,JSON.stringify(cart),(err)=>console.log(err));
        });
    }

    static deleteProductfromCart(id,productPrice){
        fs.readFile(p,(err,fileContent)=>{
            if(!err && fileContent.length !=0){
                const updatedCart = {...JSON.parse(fileContent)};
                const product = updatedCart.products.find((p)=>p.id == id);
                if(!product){
                    return;
                }
                let productQty = product.qty;
                updatedCart.products = updatedCart.products.filter((p)=> p.id !==id);
                updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
               
                fs.writeFile(p,JSON.stringify(updatedCart),(err)=>console.log(err));

            }
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
          const cart = JSON.parse(fileContent);
          if (err) {
            cb(null);
          } else {
            cb(cart);
          }
        });
      }
}