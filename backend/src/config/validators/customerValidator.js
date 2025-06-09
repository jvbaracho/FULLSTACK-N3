const { body } = require('express-validator');

exports.validateCustomer = [
  body('name').notEmpty(),
  body('address').notEmpty(),
];
