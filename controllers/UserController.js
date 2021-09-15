const User = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
// const utility = require("../helpers/utility");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const mailer = require("../helpers/mailer");
// const { constants } = require("../helpers/constants");

/**
 * Update primary user data.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      mobile
 * @param {string}      email
 */
 exports.updateUser = [
    auth,
	body("firstName").isLength({ min: 1 }).trim().withMessage("First name must be specified.")
		.isAlphanumeric().withMessage("First name has non-alphanumeric characters."),
	body("lastName").isLength({ min: 1 }).trim().withMessage("Last name must be specified.")
		.isAlphanumeric().withMessage("Last name has non-alphanumeric characters."),
    body("mobile").isLength({ min: 10, max: 10 }).trim().withMessage("Mobile no. must be 10 digit number.")
		.isNumeric().withMessage("Mobile no. must be 10 digit number."),
	sanitizeBody("*").escape(),
	(req, res) => {
		console.log(req.body);
		try {
			const errors = validationResult(req);
			var userUpd = new User(
				{ 
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					mobile: req.body.mobile,
					email: req.body.email
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				var query = {email : req.body.email};
				User.findOne(query).then(user => {
					if (user) {	
						//Check account confirmation.
						if(user.isConfirmed){
							// Check User's account active or not.
								if(user.status) {
									User.findOneAndUpdate(query, {
										firstName: userUpd.firstName,
										lastName: userUpd.lastName,
										mobile: userUpd.mobile 
									}).catch(err => {										
										return apiResponse.ErrorResponse(res, err);										
									});
									return apiResponse.successResponse(res,"Profile data updated.");
								}else {
									return apiResponse.unauthorizedResponse(res, "Account is not active. Please contact admin.");
								}
							}else{
								return apiResponse.unauthorizedResponse(res, "OTP_Pending");
						}	
					}else{
						return apiResponse.unauthorizedResponse(res, "Email does not exists!");
					}
				});
			}
		} catch (err) {			
			return apiResponse.ErrorResponse(res, err);
		}
	}
 ]