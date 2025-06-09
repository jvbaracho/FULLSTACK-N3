const Product = require('../models/Product');

exports.getProductById = async (req, res) => {
  // buscar um produto por ID.... acho
};

exports.getProducts = async (req, res) => {
  const { limit = 10, page = 1, search } = req.query;
  const query = search ? { name: new RegExp(search, 'i') } : {};

  const products = await Product.find(query)
    .limit(Number(limit))
    .skip((page - 1) * limit)
    .lean()
    .select('-__v');

  res.json(products);
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).lean();

  if (!updated) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  
};
