// controllers/pedidosController.js
const pedidos = require('../models/pedidos');

// GET /pedidoss?nome=xxx&ativo=true&sort=nome&limit=10&page=2&fields=nome,preco
exports.getpedidoss = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };

    // Campos de controle que não fazem parte do filtro direto
    const excludeFields = ['page', 'limit', 'sort', 'fields'];
    excludeFields.forEach(f => delete queryObj[f]);

    // Filtros (ex: ?nome=abc&ativo=true)
    let queryStr = JSON.stringify(queryObj);
    // Aqui você pode expandir para filtros avançados se quiser (ex: gte, lte)

    let query = pedidos.find(JSON.parse(queryStr));

    // Projeção de campos (select)
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    // Ordenação (sort)
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('nome');
    }

    // Paginação
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // Otimização lean()
    const pedidoss = await query.lean();

    res.json({ success: true, count: pedidoss.length, data: pedidoss });
  } catch (error) {
    next(error);
  }
};

// POST /pedidoss
exports.createpedidos = async (req, res, next) => {
  try {
    const novopedidos = await pedidos.create(req.body);
    res.status(201).json({ success: true, data: novopedidos });
  } catch (error) {
    next(error);
  }
};

// GET /pedidoss/:id
exports.getpedidosById = async (req, res, next) => {
  try {
    const pedidos = await pedidos.findById(req.params.id).lean();
    if (!pedidos) {
      return res.status(404).json({ success: false, message: 'pedidos não encontrado' });
    }
    res.json({ success: true, data: pedidos });
  } catch (error) {
    next(error);
  }
};

// PUT /pedidoss/:id
exports.updatepedidos = async (req, res, next) => {
  try {
    const pedidosAtualizado = await pedidos.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!pedidosAtualizado) {
      return res.status(404).json({ success: false, message: 'pedidos não encontrado para atualização' });
    }
    res.json({ success: true, data: pedidosAtualizado });
  } catch (error) {
    next(error);
  }
};

// DELETE /pedidoss/:id
exports.deletepedidos = async (req, res, next) => {
  try {
    const pedidosDeletado = await pedidos.findByIdAndDelete(req.params.id).lean();
    if (!pedidosDeletado) {
      return res.status(404).json({ success: false, message: 'pedidos não encontrado para remoção' });
    }
    res.json({ success: true, message: 'pedidos removido com sucesso' });
  } catch (error) {
    next(error);
  }
};
