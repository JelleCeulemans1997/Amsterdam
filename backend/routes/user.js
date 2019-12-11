const express = require("express");

const SignupController = require("../controllers/signup");
const UserController = require('../controllers/user');

const router = express.Router();

// router.post('/createCompany', SignupController.createCompany);
// router.post('/createMaker', SignupController.createMaker);

router.post('/create', UserController.createUser);

module.exports = router;
