var express = require("express");
const OrderController = require("../controllers/OrderController");

var router = express.Router();


router.post("/buy-now", OrderController.buyNow);
router.post("/add-to-cart", OrderController.addToCart);
router.get("/get-user-orders/", OrderController.getUserOrders);
router.post("/buy-from-cart", OrderController.buyFromCart);
router.post("/download-order-items", OrderController.downloadOrderItems);
router.post("/update-order-status", OrderController.updateOrderStatus);
/*append-routes*/

module.exports = router;