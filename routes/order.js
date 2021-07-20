const express=require("express")
const router=express.Router()
const {isAdmin,
       isAuthenticated,
       isSignedIn
      }=require("../controllers/auth")

const {getUserById,pushOrderInPurchaselist}=require("../controllers/user")

const { createOrder, getAllOrders}=require("../controllers/order")



router.param("userId",getUserById)

//creating order
router.post("order/create/:userId",
              isSignedIn,
              isAuthenticated,
              pushOrderInPurchaselist,
              createOrder
            )
//admin viewing orders of user
router.get("order/all/:userId",
            isSignedIn,
            isAuthenticated,
            isAdmin,
            getAllOrders
          )

module.exports=router