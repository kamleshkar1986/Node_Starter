var express = require("express");
  const OrderController = require("../controllers/OrderController");
  
  var router = express.Router();


  router.post("/buy-now", OrderController.buyNow);
/*append-routes*/

  module.exports = router;