const SUPABASE_URL = "https://oluvqhcsqfazlxwwyxjz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sdXZxaGNzcWZhemx4d3d5eGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDE0MTYsImV4cCI6MjA4ODk3NzQxNn0.QgRVoPmKQZ2pdLmvHWuSKKRrZzOcGfEoxcRdGRuhH8U";

// CADASTRAR PRODUTO
async function cadastrarProduto() {

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricaoProduto").value;
    const qtd = document.getElementById("Qtd").value;
    const valor = document.getElementById("valor").value;
    const imgURL = document.getElementById("imgURL").value

    if (!nome || !descricao || !qtd || !valor) {
        alert("Preencha todos os campos");
        return;
    }
    const response = await fetch(`${SUPABASE_URL}/rest/v1/Products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Prefer": "return=minimal"
        },
        body: JSON.stringify({
            nome: nome,
            descricao: descricao,
            qtd: qtd,
            valor: valor,
            imgURL: imgURL
        })
    });

    if (response.ok) {
        alert("Produto cadastrado com sucesso!");
    } else {
        alert("Erro ao cadastrar produto");
    }
}


// MOSTRAR PRODUTOS NA LOJA
async function carregarProdutos() {

    const container = document.getElementById("produtos");

    if (!container) return;

        const response = await fetch(`${SUPABASE_URL}/rest/v1/Products?select=*`, {
        method: "GET",
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        }
    });

    const produtos = await response.json(); 

    container.innerHTML = "";

    produtos.forEach(produto => {

        container.innerHTML += `
        <div class="col-md-3 mb-4">
            <div class="card h-100 shadow-sm">
                <img src="${produto.imgURL}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">${produto.descricao}</p>
                    <p class="fw-bold text-success">R$ ${produto.valor}</p>
                    <button class="btn btn-dark w-100">Comprar</button>
                </div>
            </div>
        </div>
        `;
    });

}

// Carrega automaticamente quando abrir a página
document.addEventListener("DOMContentLoaded", carregarProdutos);