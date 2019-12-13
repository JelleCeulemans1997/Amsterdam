const express = require("express");

const CompanyController = require("../controllers/company");

const router = express.Router();

router.post('/create', CompanyController.createCompany);
router.get('/getByUserId/:id', CompanyController.getByUserId);
router.put('/update/:id', CompanyController.updateCompany);
router.get('', CompanyController.getAllCompanies);


module.exports = router;
