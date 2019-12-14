const Assignment = require("../models/assignment");
const jwt = require("jsonwebtoken");

exports.getAll = (req, res, next) => {
  Assignment.find()
    .populate("company")
    .then(documents => {
      res.status(200).json({
        message: "assignment fetched succesully",
        assignments: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching assignments failed!"
      });
    });
};

exports.createAssignment = (req, res, next) => {
  console.log(req.body.title, req.body.description);
  const assignment = new Assignment({
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    location: req.body.location,
    creator: jwt.decode(req.body.creator)._id
  });
  assignment
    .save()
    .then(createdAssignment => {
      res.status(201).json({
        message: "Assignment added successfully",
        assignment: {
          ...createdAssignment,
          id: createdAssignment._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating an assignment failed!"
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
  const creatorId = jwt.decode(req.body.creator)._id;
  const assignment = new Assignment({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    location: req.body.location,
    creator: creatorId
  });
  Assignment.updateOne({ _id: req.params.id, creator: creatorId }, assignment)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
};

exports.getAssignment = (req, res, next) => {
  console.log(req.params);
  Assignment.findById(req.params.id)
    .populate("applies.apply company")
    .then(assignment => {
      console.log(assignment);
      if (assignment) {
        res.status(200).json({
          message: "Fetching assignment succeeded",
          assignment
        });
      } else {
        res.status(404).json({ message: "Assignment not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching assignment failed!"
      });
    });
};

exports.deleteAssignment = (req, res, next) => {
  Assignment.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting assignment failed!"
      });
    });
};

exports.getAllApplied = (req, res, next) => {
  Assignment.find({ 'applies.apply': req.params.id })
    .then(documents => {
      res.status(200).json({
        message: "assignment fetched succesully",
        assignments: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching assignments failed!"
      });
    });
};

exports.getAllAccepted = (req, res, next) => {
  Assignment.find({ 'accepted.accept': req.params.id })
    .then(documents => {
      res.status(200).json({
        message: "assignment fetched succesully",
        assignments: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching assignments failed!"
      });
    });
};

exports.getAllDenied = (req, res, next) => {

  Assignment.find({ 'denied.deny': req.params.id })
    .then(documents => {
      res.status(200).json({
        message: "assignment fetched succesully",
        assignments: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching assignments failed!"
      });
    });
};
