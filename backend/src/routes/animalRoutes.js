const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const validateAnimal = require('../middleware/validateAnimal');

router.get('/', animalController.getAllAnimals);
router.get('/:id', animalController.getAnimalById);
router.post('/', validateAnimal, animalController.createAnimal);
router.put('/:id', validateAnimal, animalController.updateAnimal);
router.delete('/:id', animalController.deleteAnimal);

module.exports = router;