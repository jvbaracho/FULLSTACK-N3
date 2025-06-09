const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorMiddleware');
require('dotenv').config();

const app = express();

// Middlewares globais
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(rateLimiter);
app.use(express.json());

// Rotas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));

// Middleware de erro
app.use(errorHandler);

module.exports = app;
