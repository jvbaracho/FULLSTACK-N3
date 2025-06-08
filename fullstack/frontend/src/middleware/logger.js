// middleware/logger.js
const morgan = require('morgan');

// Configuração personalizada do Morgan
const logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms',
    '- IP:', req.ip,
  ].join(' ');
});

module.exports = logger;
