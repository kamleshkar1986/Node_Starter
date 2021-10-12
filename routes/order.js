var express = require("express");
const OrderController = require("../controllers/OrderController");

var router = express.Router();


router.post("/buy-now", OrderController.buyNow);
router.post("/add-to-cart", OrderController.addToCart);
router.get("/get-user-orders/", OrderController.getUserOrders);
/*append-routes*/

module.exports = router;