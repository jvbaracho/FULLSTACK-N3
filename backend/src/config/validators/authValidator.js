const { body } = require('express-validator');

exports.validateLogin = [
  body('email').isEmail(),
  body('password').notEmpty(),
];

exports.validateRegister = [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];
