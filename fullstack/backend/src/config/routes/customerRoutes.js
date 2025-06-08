const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/customerController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { validateCustomer } = require('../validators/customerValidator');

router.get('/', auth, role('admin'), ctrl.getCustomers);
router.post('/', auth, validateCustomer, validate, ctrl.createCustomer);
router.put('/:id', auth, validateCustomer, validate, ctrl.updateCustomer);

module.exports = router;
