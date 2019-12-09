const Tag = require('../models/tag');

exports.createTag = (req, res, next) => {
  const tag = new Tag({
    name: req.body.name,
    usages: req.body.usages,
  });
  tag.save().then(createdTag => {
      res.status(201).json({
        message: 'Tag added successfully',
        tag: {
          ...createdTag,
          id: createdTag._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a tag failed!'
      });
    });
};

exports.getAll = (req, res, next) => {
  Tag.find()
    .then(documents => {
      res.status(200).json({
        message: 'Tags fetched successfully!',
        tags: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching tags failed!'
      });
    });
};
