const express = require('express')
const Company = require('../models/company')
// const router = express.Router()


// router.get('/companies', (req, res, next) => {
//     try {
//         Company.find().exec((err, companies) => {
//             res.json(companies);
//         });
//     } catch (error) {
//         res.status(400).send(error)
//     }
// });

// module.exports = router


exports.createCompany = (req, res) => {
  const company = new Company( {
    ...req.body
  })
    .save()
    .then(cratedCompany => {
      res.status(201).json({
        message: 'Company added successfully',
        company: {
          ...cratedCompany,
          id: cratedCompany._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({ message: 'Creating a company failed!' });
    });
}
