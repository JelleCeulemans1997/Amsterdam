const Company = require('../models/company');
const Maker = require('../models/developer');

exports.createCompany = (req, res, next) => {
  console.log(req.body);
  const company = new Company({
    naam: req.body.naam,
    userId: req.body.userId,
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

exports.createMaker = (req, res, next) => {
  console.log(req.body);
  const maker = new Maker({
    nickname: req.body.nickname,
    userId : req.body.userId,
    firstname: req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    skills:req.body.tags,
    tags: null,
    github:req.body.github,
    linkedin:req.body.linkedin,
    experience:req.body.experience,
    dateofbirth:req.body.dateofbirth,
    location: req.body.location,
    bio: req.body.bio,
    review: [{
      like: null,
      value: null
    }]
  });
  maker.save().then(createdMaker => {
      res.status(201).json({
        message: 'Maker added successfully',
        maker: {
          ...createdMaker,
          id: createdMaker._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a Maker failed!'
      });
    });
};
