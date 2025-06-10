const Pedido = require('../models/Pedido');

exports.getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('cliente').populate('produtos.produto').select('-__v').lean();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar pedidos.' });
  }
};

exports.createPedido = async (req, res) => {
  try {
    const novo = await Pedido.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar pedido.' });
  }
};

exports.updatePedido = async (req, res) => {
  try {
    const atualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ erro: 'Pedido não encontrado.' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar pedido.' });
  }
};
