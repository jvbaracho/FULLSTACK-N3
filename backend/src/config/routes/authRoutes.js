const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');
const validate = require('../middlewares/validateMiddleware');
const { validateLogin, validateRegister } = require('../validators/authValidator');

router.post('/login', validateLogin, validate, ctrl.login);
router.post('/register', validateRegister, validate, ctrl.register);

module.exports = router;
