const express=require("express")
const router=express.Router()


const {isSignedIn,isAuthenticated}=require("../controllers/auth")
const { getUserById, getUser, userPurchaseList } = require("../controllers/user")

//getting user id from the url
router.param("userId",getUserById)

router.get("/user/:userId",
           isSignedIn,
           isAuthenticated,
           getUser
          )

router.get("order/:orderId",
            isSignedIn,
            isAuthenticated,
            userPurchaseList
          )

module.exports=router