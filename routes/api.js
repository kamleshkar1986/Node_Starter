var express = require("express");
var authRouter = require("./auth");
var bookRouter = require("./book");
var productRouter = require("./product");

var app = express();

app.use("/auth/", authRouter);
app.use("/book/", bookRouter);
app.use("/products/", productRouter);

module.exports = app;