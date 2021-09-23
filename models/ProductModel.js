var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	sNo: {type: Number, required: true},
	title: {type: String, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},
	dispColor: {type: String, required: true},
	aspectRatio: {type: String, required: true},
	tileImgFile: {type: String, required: true},
	carousalImgFile: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model("Product", ProductSchema);