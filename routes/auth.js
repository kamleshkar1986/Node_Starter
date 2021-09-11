var express = require("express");
const AuthController = require("../controllers/AuthController");

var router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify-otp", AuthController.verifyConfirm);
router.post("/resend-verify-otp", AuthController.resendConfirmOtp);
router.post("/change-pass-otp", AuthController.getPasswordChangeOtp)
router.post("/change-pass-by-otp", AuthController.changePasswordByOTP);

module.exports = router;