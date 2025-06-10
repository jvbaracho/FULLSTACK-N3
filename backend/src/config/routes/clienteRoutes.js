const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteController');

router.get('/', controller.getClientes);
router.post('/', controller.createCliente);
router.put('/:id', controller.updateCliente);

module.exports = router;
