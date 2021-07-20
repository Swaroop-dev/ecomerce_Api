const mongoose=require("mongoose")


const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        required:true,
        maxlength:1000,
    },
    price:{
        type:Number,
        required:true
    },
    sold:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        min:0
    },
//images of a product    
    photo:{
       type:Buffer,
       contentType:String
    },

},{timestamps:true})


module.exports=mongoose.model("product",ProductSchema)