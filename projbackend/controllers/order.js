const {Order,Productcart} = require("../models/order");

//params
exports.getOrderById = (req,res,next,id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err,order) =>{
        if(err){
            return res.status(400).json({
                error :"No order found"
            })
        }
        req.order =order;
        next();
    })
}

//create
exports.createOrder = (req,res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                err : "Failed to save the order in DB"
            })
        }
        res.json(order);
    })
}

//orders
exports.getAllOrders = (req,res) => {
    Order.find()
    .populate("user" , "_id name")
    .exec((err,order)=>{
        if(err){
        return res.status(400).json({
            error : "No orders found in DB "
        })
    }
    res.json(order)
    })
}

//


exports.getOrderStatus = (req,res) =>{
    res.json(order.schema.path("status").enumValues);

};
exports.updateStatus =(req,res) =>{
    Order.update(
        {_id : req.body.orderId},
        {$set: {status :req.body.status}},
        (err,order) =>{
            if(err){
                return res.status(400).json({
                    error : "Cannot update order status "
                })
            }
            res.json(order);
        }
    )
};