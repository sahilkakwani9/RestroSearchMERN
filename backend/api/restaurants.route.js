//a file that specifies different routes of our project
import express from "express"
import restaurantsCtrl from "./restaurants.controller.js"

const router = express.Router()

router.route("/").get(restaurantsCtrl.apiGetRestaurants)
router.route("/home").get((req,res)=>{res.send("Now, we are at main")})

export default router