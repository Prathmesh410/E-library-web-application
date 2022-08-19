var express = require('express');
const { check,validationResult } = require('express-validator');
var router = express.Router();
const{ signout ,signup , signin,isSignedIn} =require("../controllers/auth")

router.post("/signup" ,
[ 
check("name").isLength({min : 3})
.withMessage("Name should be atleast 3 characters"),
check("email").isEmail()
.withMessage("Email is required"),
check("password").isLength({ min : 8})
.withMessage("Password should be atlest 8 charcters"),
],
signup);


router.post(
    "/signin" , 
[
check("email").isEmail()
.withMessage("Email is required."),
check("password").isLength({ min : 3})
.withMessage("Password is Required."),
],
signin);




router.get("/signout" ,signout);
router.get("/testroute",isSignedIn,(req,res) => {
    res.json(req.auth);
});


module.exports = router;