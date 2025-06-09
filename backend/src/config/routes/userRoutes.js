const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { validateUpdateUser } = require('../validators/userValidator');

router.get('/', auth, role('admin'), ctrl.getUsers);
router.get('/profile', auth, ctrl.getProfile);
router.put('/:id', auth, role('admin'), validateUpdateUser, validate, ctrl.updateUser);

module.exports = router;
