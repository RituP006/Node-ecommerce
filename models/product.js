const fs=require('fs');
const path=require('path');

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

    constructor(title,imgUrl,description,price){
        {
            this.title=title;
            this.imageUrl=imgUrl;
            this.description=description;
            this.price=price;
        }
       }

    save(){
        this.id=Math.random().toString();
    getProductsFromfile((products)=>{
        console.log(products);
            products.push(this);
            console.log(products);
            fs.writeFile(p,JSON.stringify(products),(err)=>{console.log(err);});
         }
         );
        
    }

    static fetchAll(cb){
       getProductsFromfile(cb);
    }
}