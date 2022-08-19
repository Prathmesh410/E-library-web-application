const express = require( "express");
const router = express.Router();

const {getProductById,createProduct,getProduct,getAllUniqueCategories,updateProduct,deleteProduct,photo,getAllProducts} = require("../controllers/product");
const {getUserById} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");



//parms
router.param("userId", getUserById);
router.param("productId", getProductById);


//routes
//create route
router.post("/product/create/:userId" ,isSignedIn, isAuthenticated, isAdmin, createProduct);

//getroutes
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//delete
router.delete("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin,deleteProduct );

//updateroute
router.put("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin,updateProduct );

//listingroute - authentication is not required so every onecan see the products
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);
module.exports = router;