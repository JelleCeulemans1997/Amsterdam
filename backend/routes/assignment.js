const express = require("express");
const AssignmentController = require("../controllers/assignment");
const extractPdf = require("../middleware/file-pdf");
const Assignment = require('../models/assignment');


const router = express.Router();

router.post('/create', AssignmentController.createAssignment);
router.get('/:id', AssignmentController.getAssignment);
router.put('/:id', AssignmentController.updateAssignment)
router.get('', AssignmentController.getAll);
router.delete('/:id', AssignmentController.deleteAssignment);
router.delete('/deletebyuserid/:id', AssignmentController.deleteAllUserAssignment);
router.get('/applies/:id', AssignmentController.getAllApplied);
router.get('/accepted/:id', AssignmentController.getAllAccepted);
router.get('/denied/:id', AssignmentController.getAllDenied);
router.get('/getByCompany/:creatorId', AssignmentController.getByCreatorId);
router.patch('/applyassignment/:id', AssignmentController.applyAssignment);
router.patch('/acceptappliedassignment/:id', AssignmentController.acceptAppliedAssignment);
router.patch('/denyappliedassignment/:id', AssignmentController.denyAppliedAssignment);
router.patch('/removeappliedassignment/:id', AssignmentController.removeAppliedAssignment);
router.patch('/deleteappliedbyuser', AssignmentController.deleteAppliedByUser);
router.patch('/deleteacceptedbyuser', AssignmentController.deleteAcceptedByUser);
router.patch('/deletedeniedbyuser', AssignmentController.deleteDeniedByUser);

module.exports = router;
