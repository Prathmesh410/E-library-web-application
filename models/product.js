const mongoose = require ("mongoose"); 
const {ObjectId} = mongoose.Schema ;

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        maxlength : 50

    },
    description : {
        type : String,
        trim : true,
        required : true,
        maxlength : 500

    },
   
    category : {
        type : ObjectId,
        ref : "Category",
        required : true,
    },
    stock : {
        type : Number,
    },
    soldunit :{
        type : Number,
        default :0 
    },
    photo : {
         data : Buffer,
         contentType : String
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
      }

},
{timestamps : true}
);

module.exports = mongoose.model("Product" , productSchema);