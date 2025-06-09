const Customer = require('../models/Customer');

exports.getCustomers = async (req, res) => {
  const customers = await Customer.find().lean().select('-__v');
  res.json(customers);
};

exports.getCustomerById = async (req, res) => {
};

exports.createCustomer = async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json(customer);
};

exports.updateCustomer = async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.json(updated);
};

exports.deleteCustomer = async (req, res) => {
};
