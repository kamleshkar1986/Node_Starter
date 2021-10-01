var express = require("express");
var authRouter = require("./auth");
var userRouter = require("./user");
var bookRouter = require("./book");
var productRouter = require("./product");
var orderRouter = require("./order");
/*router-space*/

var app = express();

app.use("/auth/", authRouter);
app.use("/user/", userRouter);
app.use("/book/", bookRouter);
app.use("/products/", productRouter);
app.use("/order/", orderRouter);
/*use-space*/

module.exports = app;