// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Erro interno no servidor';

  // Exemplo para erros de validação do Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  // Erro de cast de ObjectId inválido
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `ID inválido: ${err.value}`;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};