const User = require("../models/user");
const Order =require("../models/order")



exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
            if(err || !user){
                return res.status(400).json({
                    error : " no user is found"
                })
            };
            req.profile = user;
            next();
    });
};

exports.getUser = (req,res) => {
    //following info  is hide from showing
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile.__v = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req,res) =>{
    
    User.findByIdAndUpdate(
        {_id : req.profile._id},//which id you wnt to update
        {$set : req.body},//this set will constain all the updation value
        {new : true, useFindAndModify : false },//compulsury parameters
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error : "You are not authorised or not sucessful"
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);

        }
        
    );
    
};

exports.userPurchaseList = (req,res) => {
        Order.find({user : req.profile._id})
        .populate("user","_id name")
        .exec((err,order) => {
            if(err){
            return res.status(400).json({
                error : "no order in this user"
            });
        }

        return res.json(order);

        });
      
};

exports.pushOrderInPurchaseList = (req,res,next) =>{ //this middelewaer will push new purchases whnever we use it 
  let  purchases = []
  req.body.order.products.forEach(product => {
      purchases.push({
          _id : product._id,
          name : product.name,
          description : product.description,
          category : product.category,
          quantity : product.quantity,
          amount : req.body.order.amount,
          transaction_id : req.body.order.transaction_id
      });
      
  });

//store user in mongodb 
User.findOneAndUpdate(
    {_id : req.profile._id},
    {$push : {purchases : purchases}},//This will update the user purchase with the new purchase 
    {new : true },//this tells the database to send new info not the old one
    (err, purchases) => {
        if(err){
            return res.status(400).json({
                error : "unable t0 save the purchase in list"
            })
        }
        next();
    }
);


}