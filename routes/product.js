
const express=require("express")
const router=express.Router()


const {createProduct,getAllProducts}=require("../controllers/product")
const {isAdmin,isSignedIn,isAuthenticated}=require("../controllers/auth")
const {getUserById}=require("../controllers/user")

//params
router.param("userId",getUserById)

//admin creating product
router.post("/product/create/:userId",
             isSignedIn,
             isAuthenticated,
             isAdmin,
             createProduct
            )
            
//user able to browse all products
router.get("/products",getAllProducts)



module.exports=router