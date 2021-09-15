var express = require("express");
var authRouter = require("./auth");
var userRouter = require("./user");
var bookRouter = require("./book");
var productRouter = require("./product");

var app = express();

app.use("/auth/", authRouter);
app.use("/user/", userRouter);
app.use("/book/", bookRouter);
app.use("/products/", productRouter);

module.exports = app;