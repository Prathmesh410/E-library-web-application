const mongoose = require ("mongoose");
const {ObjectId} = mongoose.Schema ;
const ProductcartSchema = new mongoose.Schema({
    product : {
        type : ObjectId,
        ref : "Product",
    },
    name : String,
    count : Number,
    prize : Number,
})

const Productcart = mongoose. model("Productcart",ProductcartSchema);

const orderSchema = new mongoose.Schema({
    Products : [ProductcartSchema],
    transaction_Id : {},
    amount : {type : Number},
    address : String ,
    status : {
        type : String,
        default : "Recieved",
        enum : ["Cancelled" , "Delivered" , "Shiped" , "Porocessing" , "Recieved"]
    },

    updated : Date,
    user : {
        type : ObjectId,
        ref : "User"
    }

    
},
{timestamps : true},
);

const Order = mongoose. model("Order",orderSchema);

module.exports = {Order,Productcart};