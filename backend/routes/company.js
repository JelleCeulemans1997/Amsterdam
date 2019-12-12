const express = require("express");

const CompanyController = require("../controllers/company");

const router = express.Router();

router.post('/create', CompanyController.createCompany);

module.exports = router;
