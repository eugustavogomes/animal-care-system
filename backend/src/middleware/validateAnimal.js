const { body, validationResult } = require('express-validator');

const validateAnimal = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('O nome é obrigatório')
    .isLength({ min: 2 })
    .withMessage('O nome deve ter pelo menos 2 caracteres'),
  body('birthDate')
    .notEmpty()
    .withMessage('A data de nascimento é obrigatória')
    .isISO8601()
    .withMessage('A data de nascimento deve estar no formato AAAA-MM-DD'),
  body('species')
    .trim()
    .notEmpty()
    .withMessage('A espécie é obrigatória'),
  body('habitat')
    .trim()
    .notEmpty()
    .withMessage('O habitat é obrigatório'),
  body('country')
    .trim()
    .notEmpty()
    .withMessage('O país de origem é obrigatório'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateAnimal;