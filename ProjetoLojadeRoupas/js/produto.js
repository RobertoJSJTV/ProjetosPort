const SUPABASE_URL = "https://oluvqhcsqfazlxwwyxjz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sdXZxaGNzcWZhemx4d3d5eGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDE0MTYsImV4cCI6MjA4ODk3NzQxNn0.QgRVoPmKQZ2pdLmvHWuSKKRrZzOcGfEoxcRdGRuhH8U";

async function carregarDetalhesProduto() {
    //Pega o ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');

    if (!produtoId) {
        window.location.href = 'LojaRoupas.html';
        return;
    }

    //Busca no Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/Products?id=eq.${produtoId}&select=*`, {
        method: "GET",
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        }
    });

    const produtos = await response.json();
    if (produtos.length > 0) {
        exibirProduto(produtos[0]);
    }
}

function exibirProduto(produto) {
    const container = document.getElementById("detalhe-produto");
    container.innerHTML = `
        <div class="col-md-6">
            <img src="${produto.imgURL}" class="img-fluid rounded shadow" alt="${produto.nome}">
        </div>
        <div class="col-md-6">
            <h1 class="fw-bold">${produto.nome}</h1>
            <p class="text-muted">Código: ${produto.id}</p>
            <h2 class="text-success">R$ ${produto.valor}</h2>
            <p class="mt-4">${produto.descricao}</p>
            <p><strong>Disponível:</strong> ${produto.qtd} unidades</p>
            <hr>
            <button class="btn btn-warning btn-lg w-100" onclick="adicionarAoCarrinho('${produto.id}')">
                Confirmar Compra
            </button>
        </div>
    `;
}

// Iniciar ao carregar a página
document.addEventListener('DOMContentLoaded', carregarDetalhesProduto);