const express = require("express");
const AssignmentController = require("../controllers/assignment");
const extractPdf = require("../middleware/file-pdf");

const router = express.Router();

router.post('/create', extractPdf, AssignmentController.createAssignment);
// router.get('/allDesc', TagController.getAllDesc);
// router.put('/update', TagController.putTag);
// router.delete('/delete/:id', TagController.deleteTag);

router.get("", (req, res, next) => {
  Assignment.find()
    .then(documents => {
      res.status(200).json({
        message: 'assignment fetched succesully',
        assignments: documents
      });
    });
});

router.get("/:id", (req, res, next) => {
  Assignment.find({_id: req.params.id})
    .then(document => {
      res.status(200).json({
        message: 'assignment fetched succesully',
        assignment: document
      });
    });
});


module.exports = router;
