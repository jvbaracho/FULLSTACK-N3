const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('customer products.product')
    .lean();
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
};

exports.createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
};

exports.getOrderById = async (req, res) => {
};

exports.updateOrder = async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Pedido não encontrado' });
  res.json(updated);
};

exports.deleteOrder = async (req, res) => {
};