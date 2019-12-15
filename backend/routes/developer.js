const express = require("express");

const DeveloperController = require("../controllers/developer");

const router = express.Router();

router.post('/create', DeveloperController.createDeveloper);
router.get('/:id', DeveloperController.getByUserId);
router.put('/update/:id', DeveloperController.updateDeveloper);
router.get('/getByUserId/:id', DeveloperController.getByUserId);
router.get('', DeveloperController.getAll);
router.delete('/deletebyuser/:id', DeveloperController.deleteDeveloperByUser);



module.exports = router;
