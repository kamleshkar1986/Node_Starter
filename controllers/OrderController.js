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
    callback(null, "uploads/photos");
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
  this.itemName = data.itemName
  this.units = data.units
  this.unitPrice = data.unitPrice
  this.totalPrice = data.totalPrice
  this.photos = data.photos
  this.inCart = data.inCart
  this.orderStatus = data.orderStatus
  this.refundRequested = data.refundRequested
  this.paymentStatus = data.paymentStatus
  this.user = data.user
  this.createdAt = data.createdAt;
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
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        deleteFiles(req.files);
        return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
      }
      if (req.files.length <= 0) {
        return apiResponse.ErrorResponse(res, "No photos uploaded");
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
            var order = new Order(
              {
                itemName: prod.title,
                units: req.files.length,
                unitPrice: prod.price,
                totalPrice: prod.price * req.files.length,
                photos: req.files.map(a => a.path),
                inCart: false,
                orderStatus: constants.OrderStatus.Placed,
                refundRequested: false,
                paymentStatus: constants.PaymentStatus.Successful,
                user: req.user
              });
            order.save(function (err) {
              if (err) { return apiResponse.ErrorResponse(res, err); }
              return apiResponse.successResponseWithData(res, "Order placed successfully!", new OrderData(order));
            });
            console.log(order);
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
  },
];

function deleteFiles(files) {
  files.forEach(function (file) {
    fs.unlink(file.path, function (err) {
      //do nothing
    });
  });
}
