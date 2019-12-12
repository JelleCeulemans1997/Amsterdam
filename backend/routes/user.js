const express = require("express");

const SignupController = require("../controllers/signup");
const UserController = require('../controllers/user');

const router = express.Router();

// router.post('/createCompany', SignupController.createCompany);
// router.post('/createMaker', SignupController.createMaker);

router.get('/getById/:id', UserController.getByUserId)

router.post('/create', UserController.createUser);

router.post('/login',  UserController.login)
router.post('/:id',  UserController.getUser)

module.exports = router;
