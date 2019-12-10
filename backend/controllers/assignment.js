const Assignment = require('../models/assignment');

exports.createAssignment = (req, res, next) => {
  //const url = req.protocol + '://' + req.get('host');
  const assignment = new Assignment({
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    location: req.body.location//,
    //pdf: url + '/pdf/' + req.file.filename
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

exports.getAssignment = (req, res, next) => {
  console.log(req.params);
  Assignment.findById(req.params.id)
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
