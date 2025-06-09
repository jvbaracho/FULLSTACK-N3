const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pendente', 'concluído'], default: 'pendente' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
