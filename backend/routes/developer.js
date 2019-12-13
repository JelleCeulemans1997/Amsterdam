const express = require("express");

const DeveloperController = require("../controllers/developer");

const router = express.Router();

router.get('/getByUserId/:id', DeveloperController.getByUserId);


module.exports = router;
