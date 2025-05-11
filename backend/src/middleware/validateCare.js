const { body, validationResult } = require('express-validator');

const validateCare = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('O nome do cuidado é obrigatório')
    .isLength({ min: 2 })
    .withMessage('O nome deve ter pelo menos 2 caracteres'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('A descrição não pode exceder 500 caracteres'),
  body('frequency')
    .trim()
    .notEmpty()
    .withMessage('A frequência é obrigatória')
    .isIn(['diária', 'semanal', 'mensal', 'anual'])
    .withMessage('A frequência deve ser: diária, semanal, mensal ou anual'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateCare;