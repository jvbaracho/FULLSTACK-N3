require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes'); // exemplo

const app = express();

// Middlewares globais
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API está rodando');
});

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));
