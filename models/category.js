const mongoose = require ("mongoose");

const categoryShcema = new mongoose.Schema({
    name :{
        type : String,
        trim : true,
        required : true,

    }
},
{timestamps : true,}
);

module.exports = mongoose.model("Category",categoryShcema);
