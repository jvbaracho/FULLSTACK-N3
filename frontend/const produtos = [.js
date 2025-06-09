const produtos = [
  { nome: "Pizza Margherita", preco: 30 },
  { nome: "Pizza Calabresa", preco: 35 },
  { nome: "Refrigerante", preco: 8 }
];

function renderizarProdutos() {
  const container = document.getElementById("produtos");
  produtos.forEach(p => {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `<h3>${p.nome}</h3><p>R$ ${p.preco}</p>`;
    container.appendChild(div);
  });
}

function realizarPedido() {
  fetch("https://SEU_BACKEND_URL/pedido", {
    method: "POST",
    body: JSON.stringify({ itens: produtos }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(data => alert("Pedido confirmado! ID: " + data.id))
  .catch(err => alert("Erro ao enviar pedido."));
}

renderizarProdutos();
