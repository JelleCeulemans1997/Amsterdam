const express = require("express");

const TagController = require("../controllers/tag");

const router = express.Router();

router.post('/create', TagController.createTag);
router.get('/all', TagController.getAll);

module.exports = router;
