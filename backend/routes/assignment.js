const express = require("express");
const AssignmentController = require("../controllers/assignment");
const extractPdf = require("../middleware/file-pdf");

const router = express.Router();

router.post('/create', AssignmentController.createAssignment);
router.get('/:id', AssignmentController.getAssignment);
// router.get('/allDesc', TagController.getAllDesc);
// router.put('/update', TagController.putTag);
// router.delete('/delete/:id', TagController.deleteTag);

module.exports = router;
