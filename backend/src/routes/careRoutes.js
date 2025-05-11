const express = require('express');
const router = express.Router();
const careController = require('../controllers/careController');
const validateCare = require('../middleware/validateCare');

router.get('/', careController.getAllCares);
router.get('/:id', careController.getCareById);
router.post('/', validateCare, careController.createCare);
router.put('/:id', validateCare, careController.updateCare);
router.delete('/:id', careController.deleteCare);

module.exports = router;