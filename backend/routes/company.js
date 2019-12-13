const express = require("express");

const CompanyController = require("../controllers/company");

const router = express.Router();

router.post('/create', CompanyController.createCompany);
router.get('/getByUserId/:id', CompanyController.getByUserId);
router.put('/update/:id', CompanyController.updateCompany);


module.exports = router;
