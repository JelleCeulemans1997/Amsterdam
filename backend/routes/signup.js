const express = require("express");

const SignupController = require("../controllers/signup");

const router = express.Router();

router.post('/createCompany', SignupController.createCompany);
router.post('/createMaker', SignupController.createMaker);

module.exports = router;
