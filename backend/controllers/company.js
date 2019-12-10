const express = require('express')
const Company = require('../models/company')
const router = express.Router()


router.get('/companies', (req, res, next) => {
    try {
        Company.find().exec((err, companies) => {
            res.json(companies);
        });
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router