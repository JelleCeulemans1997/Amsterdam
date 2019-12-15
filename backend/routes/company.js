const express = require("express");

const CompanyController = require("../controllers/company");

const router = express.Router();

router.post('/create', CompanyController.createCompany);
router.get('/getByUserId/:id', CompanyController.getByUserId);
router.put('/update/:id', CompanyController.updateCompany);
router.get('', CompanyController.getAllCompanies);
router.delete('/:id', CompanyController.deleteCompany);
router.delete('/deletebyuser/:id', CompanyController.deleteCompanyByUser);


module.exports = router;
