const mongoose = require("mongoose")

// category is embedded document stored in product document
const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32,
        unique:true
    }
},
{timestamps:true}
)
module.exports=mongoose.model("category",categorySchema)