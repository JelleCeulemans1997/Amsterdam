const express = require("express");

const UserController = require('../controllers/user');

const router = express.Router();



router.get('/getById/:id', UserController.getByUserId)

router.post('/create', UserController.createUser);

router.post('/login',  UserController.login)
router.post('/:id',  UserController.getUser)

module.exports = router;
