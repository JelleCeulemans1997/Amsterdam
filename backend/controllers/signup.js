const Company = require('../models/company');

exports.createCompany = (req, res, next) => {
  console.log(req.body);
  const company = new Company({
    naam: req.body.naam,
    locatie: req.body.locatie,
    contact:[{
      voornaam: null,
      achternaam: null,
      email: null,
      telefoonnummer: null
    }],
    tags: req.body.tags,
    bio: req.body.bio,
    review: [{
      naam: null,
      text: null,
      score: null
    }]
  });
  company.save().then(createdCompany => {
      res.status(201).json({
        message: 'Company added successfully',
        company: {
          ...createdCompany,
          id: createdCompany._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a company failed!'
      });
    });
};

