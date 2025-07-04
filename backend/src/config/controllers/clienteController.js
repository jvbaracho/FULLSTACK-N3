const Cliente = require('../models/Cliente');

exports.getClientes = async (req, res) => {
  try {
    const { nome } = req.query;
    const query = nome ? { nome: new RegExp(nome, 'i') } : {};
    const clientes = await Cliente.find(query).select('-__v').lean();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar clientes.' });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const novo = await Cliente.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar cliente.' });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const atualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ erro: 'Cliente não encontrado.' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar cliente.' });
  }
};
