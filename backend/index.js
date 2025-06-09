require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/pedido", (req, res) => {
  const pedido = req.body;
  console.log("Pedido recebido:", pedido);
  // Aqui você pode inserir no banco RDS se quiser
  res.json({ status: "ok", id: Date.now() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
