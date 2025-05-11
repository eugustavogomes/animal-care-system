const express = require('express');
const router = express.Router();
const caregiverController = require('../controllers/careGiverController');


router.get('/', caregiverController.getAllCaregivers);
router.post('/', caregiverController.createCaregiver);

module.exports = router;