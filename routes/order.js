var express = require("express");
const OrderController = require("../controllers/OrderController");

var router = express.Router();


router.post("/buy-now", OrderController.buyNow);
router.post("/add-to-cart", OrderController.addToCart);
/*append-routes*/

module.exports = router;