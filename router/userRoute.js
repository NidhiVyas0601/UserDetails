const express = require("express");
const router = express.Router();
const { signUp, signIn ,getUserProfile} = require("../controller/userController");
const {  
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validator/auth");

const auth = require("../middleware/userAuth");


router.route("/signin").post(validateSignIpRequest, isRequestValidated, signIn);


router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);

router.route("/profile").get(auth,getUserProfile);


module.exports = router