// Array de produtos
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// CADASTRAR PRODUTO
function cadastrarProduto() {

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricaoProduto").value;
    const qtd = document.getElementById("Qtd").value;
    const valor = document.getElementById("valor").value;

    if (!nome || !descricao || !qtd || !valor) {
        alert("Preencha todos os campos");
        return;
    }

    const produto = {
        nome: nome,
        descricao: descricao,
        qtd: qtd,
        valor: valor
    };

    produtos.push(produto);

    localStorage.setItem("produtos", JSON.stringify(produtos));

    alert("Produto cadastrado com sucesso!");

    document.getElementById("nome").value = "";
    document.getElementById("descricaoProduto").value = "";
    document.getElementById("Qtd").value = "";
    document.getElementById("valor").value = "";
}


// MOSTRAR PRODUTOS NA LOJA
function carregarProdutos() {

    const container = document.getElementById("produtos");

    if (!container) return;

    container.innerHTML = "";

    produtos.forEach(produto => {

        container.innerHTML += `
        <div class="col-md-3 mb-4">
            <div class="card h-100 shadow-sm">
                <img src="img/produtoPadrao.png" class="card-img-top" alt="${produto.nome}">
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