const Product = require("../models/ProductModel");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

/**
 * Product List.
 * 
 * @returns {Object}
 */
exports.productList = [	
	function (req, res) {
		try {
			Product.find({},"sNo title description price dispColor tileImgFile carousalImgFile").then((products)=>{
				if(products.length > 0){
					return apiResponse.successResponseWithData(res, "Operation success", products);
				}else{
					return apiResponse.successResponseWithData(res, "Operation success", []);
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];