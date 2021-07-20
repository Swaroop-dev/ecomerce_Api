const mongoose=require('mongoose')
const crypto = require('crypto')
const uuidv1=require('uuid/v1')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    encry_password: {               //password is encrypted by using virtual                            
                                    // methods and cryptographic func
        type:String,
    },
    salt:{                      //unique ids from uuid library
        type:String
    },
    role:{
        type:Number,
        default:0
    },
    purchases:{                      //past orders
        type:Array,
        default:[]
    }

},{timestamps:true})

userSchema
     .virtual("password")
     .set(function(password){
         this._password=password
         this.salt=uuidv1()
         this.encry_password=this.securepassword(password)
     })
     .get(function(){
         return this._password
     },
     {timestamps:true})

userSchema.methods={
    authenticate:function(plainpassword){                   //auhtenticating user
        return this.encry_password===this.securepassword(plainpassword)

    },


    securepassword:function(plainpassword){                 //encrypting password
        if(!plainpassword) return ""
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (error) {
            return ""
        }
    }
}


module.exports=mongoose.model('User',userSchema)