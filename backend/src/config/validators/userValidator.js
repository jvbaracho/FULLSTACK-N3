const { body } = require('express-validator');

exports.validateUpdateUser = [
  body('name').optional().notEmpty(),
  body('email').optional().isEmail(),
  body('role').optional().isIn(['user', 'admin']),
];
