const SUPABASE_URL = "https://oluvqhcsqfazlxwwyxjz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sdXZxaGNzcWZhemx4d3d5eGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDE0MTYsImV4cCI6MjA4ODk3NzQxNn0.QgRVoPmKQZ2pdLmvHWuSKKRrZzOcGfEoxcRdGRuhH8U";

// CADASTRAR PRODUTO
function showModal({ title, body, buttonText, buttonClass }) {
    const modalEl = document.getElementById("modalRegistraDespesa");
    if (!modalEl) return;

    const bootstrapModal = new bootstrap.Modal(modalEl);
    document.getElementById('modalTitulo').textContent = title;
    document.getElementById('modalTitulo').className = `modal-title ${buttonClass === 'btn-danger' ? 'text-danger' : buttonClass === 'btn-success' ? 'text-success' : ''}`;
    document.getElementById('modalBody').innerHTML = body;
    const botao = document.getElementById('modalBotao');
    botao.className = `btn ${buttonClass}`;
    botao.textContent = buttonText;

    bootstrapModal.show();
}

// CADASTRAR PRODUTO
async function cadastrarProduto() {
    const nomeEl = document.getElementById("nome");
    const descricaoEl = document.getElementById("descricaoProduto");
    const qtdEl = document.getElementById("Qtd");
    const valorEl = document.getElementById("valor");
    const imgURLEl = document.getElementById("imgURL");

    const nome = nomeEl.value;
    const descricao = descricaoEl.value;
    const qtd = qtdEl.value;
    const valor = valorEl.value;
    const imgURL = imgURLEl.value;

    if (!nome || !descricao || !qtd || !valor) {
        showModal({
            title: 'Erro ao gravar, verifique os dados informados',
            body: '<p>Existem campos obrigatórios não preenchidos.</p>',
            buttonText: 'Voltar e corrigir',
            buttonClass: 'btn-danger'
        });
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
        showModal({
            title: 'Registro inserido com sucesso',
            body: '<p>O Produto foi cadastrado com sucesso.</p>',
            buttonText: 'Voltar',
            buttonClass: 'btn-success'
        });

        nomeEl.value = "";
        descricaoEl.value = "";
        qtdEl.value = "";
        valorEl.value = "";
        imgURLEl.value = "";
    } else {
        showModal({
            title: 'Erro ao cadastrar produto!',
            body: '<p>Erro desconhecido.</p>',
            buttonText: 'Voltar e corrigir',
            buttonClass: 'btn-danger'
        });
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