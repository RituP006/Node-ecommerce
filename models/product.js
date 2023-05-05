const fs=require('fs');
const path=require('path');

const Cart=require('./cart');


const p=path.join(path.dirname(require.main.filename),'data','products.json');   

const getProductsFromfile=(cb)=>{
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
         
    });
}
module.exports=class Product{

    constructor(id,title,imgUrl,description,price){
        {
            this.id = id;
            this.title=title;
            this.imageUrl=imgUrl;
            this.description=description;
            this.price=price;
        }
    }

    save(){
        getProductsFromfile((products)=>{
            if(this.id){
                const existingProductIndex = products.findIndex((p=>p.id === this.id));
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex]= this;
                fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{console.log(err);});
            }else{
                this.id=Math.random().toString();
                products.push(this);
                fs.writeFile(p,JSON.stringify(products),(err)=>{console.log(err);});
            }
         }
         );
        
    }

    static fetchAll(cb){
       getProductsFromfile(cb);
    }

    static getProductByID(id,cb){
        getProductsFromfile((products)=>{
            const product = products.find(p=>p.id===id);
            cb(product);
        });
    }

    static deleteProductById(id){
        getProductsFromfile((products)=>{
            const product = products.find((p)=>p.id==id);
            const updatedProducts = products.filter(p=>p.id!==id);
            console.log(updatedProducts);
            fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                console.log(err);
                if(!err){
                    console.log("No error");
                    console.log(product);
                    Cart.deleteProductfromCart(id,product.price);
                }
            });
        });
    }
}