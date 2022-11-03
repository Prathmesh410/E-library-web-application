const category = require("../models/category");
const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const router = require("../routes/product");
const { parseInt } = require("lodash");


exports.getProductById = (req,res,next,id) => {
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error : "Product not found"
            })
        }
        req.product = product;
        next();

    });
};
exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      //destructure the fields
      const { name, description, price, category, stock } = fields;
  
      if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({
          error: "Please include all fields"
        });
      }
  
      let product = new Product(fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 30000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }
      // console.log(product);
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Saving tshirt in DB failed"
          });
        }
        res.json(product);
      });
    });
  };
//get
exports.getProduct = (req,res) =>{
    req.product.photo = undefined;
    return res.json(req.product)
}
//this middleware is to load the image fast 
exports.photo = (req,res,next)=>{
    if (req.product.photo.data){
        res.set("Content-Type" , req.product.photo.contentType);
        return res.send(req.product.photo.data);
}
next();
}
//deletepraduct
exports.deleteProduct = (req,res)=>{
    let product = req.product;
    product.remove((err,deletedproduct) =>{
        if(err){
            return res.status(400).json({
                error : "failed to delete product"
            })
        }
        res.json({
            message :"deletion was success",deletedproduct
        })
    })
}
//updatepraduct
exports.updateProduct = (req,res)=>{
  let form =  new formidable.IncomingForm();
   form.keepExtentions = true ;

   form.parse(req,(err,fields,file) => {
       if (err){
           return res.status(400).json({
               error : "Problem in image"
           })
       };
       //desrcture the field
       const{name,description,author,category,prize,stock} = fields;
      
       //actualupdation
       let product =req.product;
       product = _.extend(product,fields)

       //file handling
       if(file.photo){
           //changed size
           if(file.photo.size >10000000){
               return res.status(400).json({
                   error :"File size too big!"
               })
            } 
              product.photo.data = fs.readFileSync(file.photo.path);
              product.photo.contentType = file.photo.type
           }
//save to db
           product.save((err,product) =>{
               if(err){
                   res.status(400).json({
                       error :"Updation failed"
                   })
               }
               res.json(product);
           })

   })
};   

//getallproducts
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  
    Product.find()
      .select("-photo")
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec((err, products) => {
        if (err) {
          return res.status(400).json({
            error: "NO product FOUND"
          });
        }
        res.json(products);
      });
  };

exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if (err){
            return res.status(400).json({
                error : "No category found"
            });
        }
        res.json(category)
    })


}

//updatestock
exports.updateStock = (req,res,next) => {
    let myOperations = req.body.order.products.map (prod =>{ 
        return {
            updateOne: {
                filter: {_id : prod._id},
                update: {$:{stock:-prod.count,sold: +prod.count}}
            }
        }
    })
    Products.bulkwrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error : "Bulk operation failed"
            })
        }
        next()
    })
}






