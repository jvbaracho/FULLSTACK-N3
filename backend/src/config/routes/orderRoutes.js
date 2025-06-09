const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/orderController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { validateOrder } = require('../validators/orderValidator');

router.get('/', auth, role('admin'), ctrl.getOrders);
router.post('/', auth, validateOrder, validate, ctrl.createOrder);
router.put('/:id', auth, role('admin'), validateOrder, validate, ctrl.updateOrder);

module.exports = router;
