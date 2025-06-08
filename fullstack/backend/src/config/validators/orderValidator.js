const { body } = require('express-validator');

exports.validateOrder = [
  body('customer').notEmpty(),
  body('products').isArray({ min: 1 }),
  body('products.*.product').notEmpty(),
  body('products.*.quantity').isInt({ gt: 0 }),
  body('total').isFloat({ gt: 0 }),
];
