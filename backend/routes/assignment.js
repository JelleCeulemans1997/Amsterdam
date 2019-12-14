const express = require("express");
const AssignmentController = require("../controllers/assignment");
const extractPdf = require("../middleware/file-pdf");
const Assignment = require('../models/assignment');


const router = express.Router();

//router.post('/create', extractPdf, AssignmentController.createAssignment);
// router.get('/assignment:company', extractPdf, AssignmentController.getAssigment);
router.post('/create', AssignmentController.createAssignment);
router.get('/:id', AssignmentController.getAssignment);
router.put('/:id', AssignmentController.updateAssignment);
router.get('', AssignmentController.getAll)




// router.get("/:id", (req, res, next) => {
//   Assignment.find({_id: req.params.id})
//     .then(document => {
//       res.status(200).json({
//         message: 'assignment fetched succesully',
//         assignment: document
//       });
//     });
// });





// user apply for an assignment
//id is the assignment id, req.body is the id of the user
router.patch("/applyassignment/:id", (req, res, next) => {
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
});

// user accept apply for an assignment
//id is the assignment id, req.body is the id of the user
router.patch("/acceptappliedassignment/:id", (req, res, next) => {
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
});

// user deny apply for an assignment
//id is the assignment id, req.body is the id of the user
router.patch("/denyappliedassignment/:id", (req, res, next) => {
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
});


//verwijder de apply na het accepteren of denyen van een apply
//id is assignmentdId en req.body is userId
router.patch("/removeappliedassignment/:id", (req, res, next) => {
  Assignment.updateOne({_id: req.params.id}, {$pull: {applies: req.body.applies}}).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({message: "update successful!"});
    } else {
      res.status(401).json({
        message: 'Not authorized!'
      });
    }
  })
});











module.exports = router;
