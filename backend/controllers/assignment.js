const Assignment = require('../models/assignment');
const jwt = require('jsonwebtoken');

exports.createAssignment = (req, res, next) => {
  console.log(req.body.title, req.body.description);
  const assignment = new Assignment({
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    location: req.body.location,
    creator: jwt.decode(req.body.creator)._id
  });
  assignment.save()
    .then(createdAssignment => {
      res.status(201).json({
        message: 'Assignment added successfully',
        assignment: {
          ...createdAssignment,
          id: createdAssignment._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating an assignment failed!'
      });
    });
};


// exports.getAssigment()= (req, res, next) => {
//   Assignment.find({email: {$regex : req.params.email}})
// };

exports.updateAssignment = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.params);
  // console.log(jwt.decode(req.body.creator)._id);
  const creatorId = jwt.decode(req.body.creator)._id
  const assignment = new Assignment({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    location: req.body.location,
    creator: creatorId
  });
  Assignment.updateOne({ _id: req.params.id, creator: creatorId}, assignment)
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
};



exports.getAssignment = (req, res, next) => {
  console.log(req.params);
  Assignment.findById(req.params.id)
    .populate('applies.apply')
  .then(assignment => {
    if (assignment) {
      res.status(200).json({
        message: 'Fetching assignment succeeded',
        assignment
      });
    } else {
      res.status(404).json({ message: 'Assignment not found!' });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Fetching assignment failed!'
    });
  });
}

  // const tag = new Tag({
  //   name: req.body.name,
  //   usages: req.body.usages,
  // });
  // tag.save().then(createdTag => {
  //     res.status(201).json({
  //       message: 'Tag added successfully',
  //       tag: {
  //         ...createdTag,
  //         id: createdTag._id
  //       }
  //     });
  //   })
  //   .catch(error => {
  //     res.status(500).json({
  //       message: 'Creating a tag failed!'
  //     });
  //   });
  //};
