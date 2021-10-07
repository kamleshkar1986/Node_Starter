const Order = require("../models/OrderModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const fs = require('fs');
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const FileType = require("file-type");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
const Product = require("../models/ProductModel");
const auth = require("../middlewares/jwt");

//Define where project photos will be stored
const photoStorage = multer.diskStorage({
  destination: function (request, file, callback) {
    const filepath = "uploads/photos/" + request.user.firstName + '_' +
      request.user._id + "/" + request.body.itemName;
      fs.exists(filepath, exist => {
      if (!exist) {
        return fs.mkdir(filepath, {recursive: true}, error => callback(error, filepath))
      }
      return callback(null, filepath)
    })
  },
  filename: function (request, file, callback) {
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const photoFileFilter = (req, file, cb) => {  
  //File check only by file extension
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
  cb(null, true);
};

var photoMulter = multer({
  storage: photoStorage,
  fileFilter: photoFileFilter,
});

// Book Schema
function OrderData(data) {
  this.id = data._id;
  this.itemName = data.itemName;
  this.units = data.units;
  this.unitPrice = data.unitPrice;
  this.totalPrice = data.totalPrice;
  this.photos = data.photos;
  this.inCart = data.inCart;
  this.orderStatus = data.orderStatus;
  this.refundRequested = data.refundRequested;
  this.paymentStatus = data.paymentStatus;
  this.user = data.user;
  this.createdAt = data.createdAt;
  this.cartDate = data.cartDate;
  this.orderDate = data.orderDate;
  this.refundReqDate = data.refundReqDate;
  this.deliveryDate = data.deliveryDate;
  this.refundDate = data.refundDate;
  this.cancellationDate = data.cancellationDate;
}

/**
 * buyNow.S
 * @param {string} itemName
 * @param {Object} photos
 *
 * @returns {Object}
 */
exports.buyNow = [
  auth,
  photoMulter.array("photos"),
  body("itemName", "Product name is not provided.").isLength({ min: 1 }).trim(),
  sanitizeBody("*").escape(),
  (req, res, next) => {
    saveOrder(req, res, false);
  },
];

/**
  * addToCart.
  *
* @param {string} itemName 
* @param {Object} photos 
 *
  * @returns {Object}
  */
exports.addToCart = [
  auth,
  photoMulter.array("photos"),
  body("itemName", "Product name is not provided.").isLength({ min: 1 }).trim(),
  sanitizeBody("*").escape(),
  (req, res, next) => {
    saveOrder(req, res, true);
  },
];


function saveOrder(req, res, toCart) {
  try {
    if (!req.files || req.files.length <= 0) {
      return apiResponse.ErrorResponse(res, "No photos uploaded!");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      deleteFiles(req.files);
      return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
    }
    (async () => {
      try {
        for (const file of req.files) {
          const fileType = await FileType.fromFile(file.path);
          if (!ALLOWED_TYPES.includes(fileType.mime)) {
            deleteFiles(req.files);
            return apiResponse.ErrorResponse(res, "Only .png, .jpg and .jpeg format allowed!");
          }
        }
        Product.findOne({ title: req.body.itemName }).then(prod => {
          if (!prod) {
            deleteFiles(req.files);
            return apiResponse.ErrorResponse(res, "Invalid product!");
          }
          var order = new Order(
            {
              itemName: prod.title,
              units: req.files.length,
              unitPrice: prod.price,
              totalPrice: prod.price * req.files.length,
              photos: req.files.map(a => a.path),
              inCart: toCart,
              refundRequested: false,
              paymentStatus: constants.PaymentStatus.NotStarted,
              user: req.user
            });
          if (toCart) {
            order.orderStatus = constants.OrderStatus.Carted;
            order.cartDate = new Date();
          }
          else {
            order.orderStatus = constants.OrderStatus.Placed;
            order.orderDate = new Date();
          }
          order.save(function (err) {
            if (err) { 
              deleteFiles(req.files);
              return apiResponse.ErrorResponse(res, err); 
            }
            return apiResponse.successResponseWithData(res, "Order placed successfully!", new OrderData(order));
          });         
        });
      }
      catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    })();
  }
  catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
}

function deleteFiles(files) {
  files.forEach(function (file) {
    fs.unlink(file.path, function (err) {
      //do nothing
    });
  });
}


