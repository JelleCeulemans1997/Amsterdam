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

exports.getAllDesc = (req, res, next) => {
  Tag.find().sort({'usages': -1})
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

exports.putTag = (req, res, next) => {
  console.log(req.body);
  const tag = new Tag({
    _id: req.body.id,
    name: req.body.name,
    usages: req.body.usages
  });
  Tag.updateOne({ _id: req.params.id}, tag)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Couldn\'t udpate post!'
      });
    });
}

exports.deleteTag = (req, res, next) => {
  console.log(req.params);
  Tag.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Deletion successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting posts failed!'
      });
    });
};
