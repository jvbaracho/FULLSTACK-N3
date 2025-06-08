const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: String,
  endereco: String,
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);

// models/Pedido.js
const pedidoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  produtos: [
    {
      produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
      quantidade: { type: Number, required: true, min: 1 },
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pendente', 'entregue'], default: 'pendente' },
}, { timestamps: true });

module.exports = mongoose.model('Pedido', pedidoSchema);
