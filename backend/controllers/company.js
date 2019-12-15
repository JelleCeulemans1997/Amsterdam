const Company = require("../models/company");


exports.deleteCompany = (req, res, next) => {
  Company.deleteOne({ _id: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'Deletion successful!' });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting company failed!'
      });
    });
};

exports.deleteCompanyByUser = (req, res, next) => {
  Company.deleteOne({ userId: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'Deletion successful!' });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting company failed!'
      });
    });
};

exports.getAllCompanies = (req, res) => {
  try {
    Company.find().exec((error, companies) => {
      res.status(200).json(companies);
    });
  } catch (error) {
    res.status(400).json({ message: 'Company not found', error });
  }
};

exports.getByUserId = (req, res) => {
  try {
    Company.findOne({ userId: req.params.id }).populate('reviews.developer').exec((error, company) => {
      res.status(200).json(company);
    });
  } catch (error) {
    res.status(400).json({ message: "Company not found", error });
  }
};

exports.getByCreatorId = (req, res) => {
  try {
    console.log(req.params.id);
    Company.findOne({ creator: req.params.id }).exec((error, company) => {
      res.status(200).json(company);
    });
  } catch (error) {
    res.status(400).json({ message: "Company not found", error });
  }
};

exports.createCompany = (req, res) => {
  const company = new Company({
    ...req.body
  });
  company.save()
    .then(cratedCompany => {
      res.status(201).json({
        message: "Company added successfully",
        company: {
          ...cratedCompany,
          id: cratedCompany._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({ message: "Creating a company failed!" });
    });
};

exports.updateCompany = (req, res) => {
  Company.updateOne({ _id: req.params.id }, req.body)
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Couldn\'t udpate company!'
      });
    });
};
