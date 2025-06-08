// controllers/clienteController.js
const cliente = require('../models/cliente');

// GET /clientes?nome=xxx&ativo=true&sort=nome&limit=10&page=2&fields=nome,preco
exports.getclientes = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };

    // Campos de controle que não fazem parte do filtro direto
    const excludeFields = ['page', 'limit', 'sort', 'fields'];
    excludeFields.forEach(f => delete queryObj[f]);

    // Filtros (ex: ?nome=abc&ativo=true)
    let queryStr = JSON.stringify(queryObj);
    // Aqui você pode expandir para filtros avançados se quiser (ex: gte, lte)

    let query = cliente.find(JSON.parse(queryStr));

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
    const clientes = await query.lean();

    res.json({ success: true, count: clientes.length, data: clientes });
  } catch (error) {
    next(error);
  }
};

// POST /clientes
exports.createcliente = async (req, res, next) => {
  try {
    const novocliente = await cliente.create(req.body);
    res.status(201).json({ success: true, data: novocliente });
  } catch (error) {
    next(error);
  }
};

// GET /clientes/:id
exports.getclienteById = async (req, res, next) => {
  try {
    const cliente = await cliente.findById(req.params.id).lean();
    if (!cliente) {
      return res.status(404).json({ success: false, message: 'cliente não encontrado' });
    }
    res.json({ success: true, data: cliente });
  } catch (error) {
    next(error);
  }
};

// PUT /clientes/:id
exports.updatecliente = async (req, res, next) => {
  try {
    const clienteAtualizado = await cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!clienteAtualizado) {
      return res.status(404).json({ success: false, message: 'cliente não encontrado para atualização' });
    }
    res.json({ success: true, data: clienteAtualizado });
  } catch (error) {
    next(error);
  }
};

// DELETE /clientes/:id
exports.deletecliente = async (req, res, next) => {
  try {
    const clienteDeletado = await cliente.findByIdAndDelete(req.params.id).lean();
    if (!clienteDeletado) {
      return res.status(404).json({ success: false, message: 'cliente não encontrado para remoção' });
    }
    res.json({ success: true, message: 'cliente removido com sucesso' });
  } catch (error) {
    next(error);
  }
};
