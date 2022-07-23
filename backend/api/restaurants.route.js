//a file that specifies different routes of our project
import express from "express"
import restaurantsCtrl from "./restaurants.controller.js"
import reviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(restaurantsCtrl.apiGetRestaurants)
router.route("/reviews")
        .post(reviewsCtrl.apiPostReview)
        .put(reviewsCtrl.apiUpdateReview)
        .delete(reviewsCtrl.apiDeleteReview)
router.route("/:id").get(restaurantsCtrl.apiGetRestaurantById)
router.route("/cuisines").get(restaurantsCtrl.apiGetRestaurantCuisines)
router.route("/home").get((req,res)=>{res.send("Now, we are at main")})

export default router