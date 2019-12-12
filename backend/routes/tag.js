const express = require("express");

const TagController = require("../controllers/tag");

const router = express.Router();

router.post('/create', TagController.createTag);
router.get('/allDesc', TagController.getAllDesc);
router.put('/update/:id', TagController.putTag);
router.delete('/delete/:id', TagController.deleteTag);

module.exports = router;
