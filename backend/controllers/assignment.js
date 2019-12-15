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

// user deny apply for an assignment
//id is the assignment id, req.body is the id of the user
exports.denyAppliedAssignment = (req, res, next) => {
  console.log(req.body.applies);
  Assignment.updateOne({_id: req.params.id}, {$push: {denied: req.body.denied}}).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({message: "update successful!"});
    } else {
      res.status(401).json({
        message: 'Not authorized! :D'
      });
    }
  })
};

//verwijder de apply na het accepteren of denyen van een apply
//id is assignmentdId en req.body is userId
exports.removeAppliedAssignment = (req, res, next) => {
  Assignment.updateOne({_id: req.params.id}, {$pull: {applies: req.body.applies}}).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({message: "update successful!"});
    } else {
      res.status(401).json({
        message: 'Not authorized!'
      });
    }
  })
};

//verwijder de apply na het accepteren of denyen van een apply
//id is assignmentdId en req.body is userId
exports.deleteAppliedByUser = (req, res, next) => {
  Assignment.updateMany({}, {$pull: {applies: req.body.applies}}).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({message: "update successful!"});
    } else {
      res.status(200).json({
        message: 'nothing to delete'
      });
    }
  })
};

//verwijder de apply na het accepteren of denyen van een apply
//id is assignmentdId en req.body is userId
exports.deleteAcceptedByUser = (req, res, next) => {
  Assignment.updateMany({}, {$pull: {accepted: req.body.accepted}}).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({message: "update successful!"});
    } else {
      res.status(200).json({
        message: 'nothing to delete'
      });
    }
  })
};

//verwijder de apply na het accepteren of denyen van een apply
//id is assignmentdId en req.body is userId
exports.deleteDeniedByUser = (req, res, next) => {
  Assignment.updateMany({}, {$pull: {denied: req.body.denied}}).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({message: "update successful!"});
    } else {
      res.status(200).json({
        message: 'nothing to delete'
      });
    }
  })
};

// user apply for an assignment
// id is the assignment id, req.body is the id of the user
exports.applyAssignment =  (req, res, next) => {
  console.log(req.body.applies);
  Assignment.updateOne({_id: req.params.id}, {$push: {applies: req.body.applies}}).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({message: "update successful!"});
    } else {
      res.status(401).json({
        message: 'Not authorized! :D'
      });
    }
  })
};

// compant accept apply for an assignment
// id is the assignment id, req.body is the id of the user
exports.acceptAppliedAssignment = (req, res, next) => {
  console.log(req.body.applies);
  Assignment.updateOne({_id: req.params.id}, {$push: {accepted: req.body.accepted}}).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({message: "update successful!"});
    } else {
      res.status(401).json({
        message: 'Not authorized! :D'
      });
    }
  })
};

exports.getByCreatorId = (req, res, next) => {
  Assignment.find({creator: req.params.creatorId})
    .then(documents => {
      res.status(200).json({
        message: 'assignment fetched succesully',
        assignments: documents
      });
    });
};

exports.createAssignment = (req, res, next) => {
  console.log(req.body);
  const assignment = new Assignment({
    ...req.body
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



exports.updateAssignment = (req, res, next) => {
  Assignment.updateOne({ _id: req.params.id, creator: req.body.creator }, req.body)
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
    .populate('accepted.developer applies.developer denied.developer company')
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

exports.deleteAllUserAssignment = (req, res, next) => {
  Assignment.deleteMany({ creator: req.params.id })
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
