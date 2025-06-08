// tests/produto.test.js
const request = require('supertest');
const app = require('../app'); // seu app express
const mongoose = require('mongoose');

beforeAll(async () => {
  // conexão com banco teste
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Testes da API Produtos', () => {
  it('Deve listar produtos', async () => {
    const res = await request(app).get('/api/produtos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('Deve criar um produto', async () => {
    const res = await request(app).post('/api/produtos').send({
      nome: 'Pizza Teste',
      preco: 30,
      categoria: 'pizza',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.nome).toBe('Pizza Teste');
  });
});
