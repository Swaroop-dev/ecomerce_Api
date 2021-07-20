const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema

const ProductCartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"product"
    },
    count:{type:Number},
    name:String,
    price:Number

})
const ProductCart=mongoose.model("ProductCart",ProductCartSchema)

const OrderSchema=new mongoose.Schema({
    
    products:[ProductCartSchema],
    transaction_id:{},
    address:String,
    amount:{type:Number},
    updated:Date,
    status:{
        type:String,
        default:"Recieved",
        enum:["Cancelled","Deliverd","Shipped","processing","Received"]
    },
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Order=mongoose.model("Order",OrderSchema)

module.exports={ProductCart,Order}