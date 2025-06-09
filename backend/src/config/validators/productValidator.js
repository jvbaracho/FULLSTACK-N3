const { body } = require('express-validator');

exports.validateProduct = [
  body('name').notEmpty(),
  body('price').isFloat({ gt: 0 }),
  body('category').isIn(['pizza', 'bebida', 'sobremesa']),
];
