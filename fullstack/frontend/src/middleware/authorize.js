// middleware/authorize.js
module.exports = function authorize(allowedRoles = []) {
  return (req, res, next) => {
    const user = req.user; // Supondo que user está no req após auth middleware

    if (!user) {
      return res.status(401).json({ success: false, message: 'Usuário não autenticado' });
    }

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      return res.status(403).json({ success: false, message: 'Acesso negado: permissão insuficiente' });
    }

    next();
  };
};
