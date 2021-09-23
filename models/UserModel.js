var mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
	pinCode: String,
	building: String,
	area: String,
	landmark: String,
	city: String,
	state: String
}, {timestamps: true});

var UserSchema = new mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},	
	mobile: {type: String, required: true},
	password: {type: String, required: true},
	deliveryAddress: {type: String, required: false},
	isConfirmed: {type: Boolean, required: true, default: 0},
	confirmOTP: {type: String, required:false},
	otpTries: {type: Number, required:false, default: 0},
	status: {type: Boolean, required: true, default: 1},
	changePasswordOTP: {type: String, required:false},
	address: {type: AddressSchema, required: false},
}, {timestamps: true});

// Virtual for user's full name
UserSchema
	.virtual("fullName")
	.get(function () {
		return this.firstName + " " + this.lastName;
	});

module.exports = mongoose.model("User", UserSchema);
