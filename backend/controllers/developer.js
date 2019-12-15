const Developer = require("../models/developer");

exports.getAll = (req, res) => {
  console.log(req.params)
  try {
    Developer.find().populate('reviews.company').exec((error, developers) => {
      res.status(200).json(developers);
    });
  } catch (error) {
    res.status(400).json({ message: 'Developers not found', error });
  }
};

exports.deleteDeveloperByUser = (req, res, next) => {
  Developer.deleteOne({ userId: req.params.id })
    .then(result => {
      res.status(200).json({ message: 'Deletion successful!' });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting developer failed!'
      });
    });
};

exports.createDeveloper = (req, res) => {
  const developer = new Developer({
    ...req.body
  });
  developer.save()
    .then(developer => {
      console.log('developer is added to the databaseeee');
      res.status(201).json({ message: 'Developer added successfully', developer });
    })
    .catch(error => {
      res.status(500).json({ message: 'Creating a developer failed!' });
    });
};

exports.getByUserId = (req, res) => {
  console.log(req.params)
  try {
    Developer.findOne({ userId: req.params.id }).populate('reviews.company').exec((error, developer) => {
      res.status(200).json(developer);
    });
  } catch (error) {
    res.status(400).json({ message: 'Developer not found', error });
  }
};


exports.updateDeveloper = (req, res) => {
  Developer.updateOne({ _id: req.params.id }, req.body)
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
  }

