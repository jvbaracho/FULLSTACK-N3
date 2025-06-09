const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { validateProduct } = require('../validators/productValidator');

router.get('/', auth, ctrl.getProducts);
router.post('/', auth, role('admin'), validateProduct, validate, ctrl.createProduct);
router.put('/:id', auth, role('admin'), validateProduct, validate, ctrl.updateProduct);

module.exports = router;
