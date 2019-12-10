const Assignment = require('../models/assignment');

exports.createAssignment = (req, res, next) => {
  console.log(req.file.filename);
  const url = req.protocol + '://' + req.get('host');
  const assignment = new Assignment({
    title: req.body.title,
    description: req.body.description,
    tags: JSON.parse(req.body.tags),
    location: [
      {
        street: 'test',
        nr: 'test',
        city: 'test',
        zipcode: 'test'
      }
    ],
    pdf: url + '/pdf/' + req.file.filename
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
      console.log('faaailleeddd');
      res.status(500).json({
        message: 'Creating an assignment failed!'
      });
    });
};
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
