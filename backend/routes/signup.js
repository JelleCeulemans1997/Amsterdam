const express = require("express");

const SignupController = require("../controllers/signup");

const router = express.Router();

router.post('/createCompany', SignupController.createCompany);

module.exports = router;
