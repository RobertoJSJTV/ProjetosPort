const SUPABASE_URL = "https://oluvqhcsqfazlxwwyxjz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sdXZxaGNzcWZhemx4d3d5eGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDE0MTYsImV4cCI6MjA4ODk3NzQxNn0.QgRVoPmKQZ2pdLmvHWuSKKRrZzOcGfEoxcRdGRuhH8U";

let usuarioLogado = null;


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

//CADASTRAR USUARIO
async function cadastroUsuario() {
    const nome = document.getElementById("nomeUsuario");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");

    const nomeUsuario = nome.value;
    const emailUsuario = email.value;
    const senhaUsuario = senha.value;

    if (!nomeUsuario || !emailUsuario || !senhaUsuario) {
        showModal({
            title: 'Erro ao cadastrar, verifique se todos os dados estão sendo informados',
            body: '<p>Existem campos obrigatórios não preenchidos</p>',
            buttonText: 'Voltar e corrigir',
            buttonClass: 'btn-danger'
        })
        return;
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/Login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Prefer": "return=minimal"
        },
        body: JSON.stringify({
            Nome: nomeUsuario,
            email: emailUsuario,
            senha: senhaUsuario,
            tipo: "user"  // Define como user por padrão
        })
    });
    if (response.ok) {
        showModal({
            title: 'Conta cadastrada com sucesso',
            body: '<p>A conta foi cadastrada com sucesso.</p>',
            buttonText: 'Voltar',
            buttonClass: 'btn-success'
        });
        nome.value = "";
        email.value = "";
        senha.value = "";
    } else {
        document.innerHTML('alert') = "<div class='alert alert-danger' role='alert'><strong>danger</strong> não foi possivel salvar!</div>";
    }
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
        document.getElementById('modalBotao').onclick = function () {
            window.location.reload();
        };

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
function aplicarPermissoes() {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));

    const inputs = document.querySelectorAll("#areaAdmin input");
    const btnCadastrar = document.querySelector("button[onclick='cadastrarProduto()']");
    const tabela = document.querySelector(".table");
    const nav = document.querySelector(".adm")

    if (!user) {
        // NÃO LOGADO
        inputs.forEach(input => input.disabled = true);
        if (btnCadastrar) btnCadastrar.disabled = true;
        if (tabela) tabela.style.display = "none";
        if (nav) nav.style.display = "none"; 
        return;
    }

    if (user.tipo !== "admin") {
        // USUÁRIO COMUM
        inputs.forEach(input => input.disabled = true);
        if (btnCadastrar) btnCadastrar.disabled = true;
        if (tabela) tabela.style.display = "none";
        if (nav) nav.style.display = "none";
    } else {
        // ADMIN
        inputs.forEach(input => input.disabled = false);
        if (btnCadastrar) btnCadastrar.disabled = false;
        if (tabela) tabela.style.display = "table";
        if (nav) nav.style.display = "inline-block"; 
            
        }
}


async function Logar() {
    const emailEl = document.getElementById("loginEmail");
    const senhaEl = document.getElementById("loginSenha");

    const email = emailEl.value;
    const senha = senhaEl.value;

    if (!email || !senha) {
        showModal({
            title: 'Erro ao logar',
            body: '<p>Email e senha são obrigatórios.</p>',
            buttonText: 'Voltar',
            buttonClass: 'btn-danger'
        });
        return;
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/Login?email=eq.${encodeURIComponent(email)}&senha=eq.${encodeURIComponent(senha)}&select=*`, {
        method: "GET",
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        }
    });

    const usuarios = await response.json();

    if (response.ok && usuarios.length > 0) {

        const user = usuarios[0];

        // O tipo já vem do Supabase (coluna "tipo")

        // salvar corretamente
        localStorage.setItem("usuarioLogado", JSON.stringify(user));
        usuarioLogado = user;
        // Login bem-sucedido
        const modalEl = document.getElementById("modalLogin");
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) {
            modal.hide();
        }

        // Alterar o link para "Perfil"
        const loginLink = document.getElementById("loginLink");
        loginLink.innerHTML = '<i class="fa-solid fa-user"></i> Perfil';
        loginLink.removeAttribute("data-bs-toggle");
        loginLink.removeAttribute("data-bs-target");
        loginLink.href = "#"; // ou link para perfil

        

        aplicarPermissoes();

        if (usuarioLogado.tipo === "admin") {
            ListarProdutos();
        }

        showModal({
            title: 'Login realizado com sucesso',
            body: '<p>Bem-vindo!</p>',
            buttonText: 'OK',
            buttonClass: 'btn-success'
        });
    } else {
        showModal({
            title: 'Erro ao logar',
            body: '<p>Email ou senha incorretos.</p>',
            buttonText: 'Voltar',
            buttonClass: 'btn-danger'
        });
    }
}

async function removerProduto(id) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/Products?id=eq.${id}`, {
        method: "DELETE",
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        }
    });

    if (response.ok) {
        showModal({
            title: 'Registro excluído com sucesso',
            body: '<p>O Item foi excluído com Sucesso.</p>',
            buttonText: 'Voltar',
            buttonClass: 'btn-success'
        });
        // Recarregar a página após fechar o modal
        document.getElementById('modalBotao').onclick = function () {
            window.location.reload();
        };
    } else {
        showModal({
            title: 'Erro ao excluir',
            body: '<p>Não foi possível excluir o item.</p>',
            buttonText: 'Voltar',
            buttonClass: 'btn-danger'
        });
    }
}

async function modificarProduto(id) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/Products?id=eq.${id}&select=*`, {
        method: "GET",
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        }
    });

    const produtos = await response.json();
    if (produtos.length > 0) {
        const produto = produtos[0];
        document.getElementById("editNome").value = produto.nome;
        document.getElementById("editDescricao").value = produto.descricao;
        document.getElementById("editQtd").value = produto.qtd;
        document.getElementById("editValor").value = produto.valor;
        document.getElementById("editImgURL").value = produto.imgURL;

        // Armazenar o ID para usar no salvar
        window.produtoId = id;

        const modal = new bootstrap.Modal(document.getElementById("modalEditar"));
        modal.show();
    }
}
async function salvarProduto() {
    const nome = document.getElementById("editNome").value;
    const descricao = document.getElementById("editDescricao").value;
    const qtd = document.getElementById("editQtd").value;
    const valor = document.getElementById("editValor").value;
    const imgURL = document.getElementById("editImgURL").value;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/Products?id=eq.${window.produtoId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
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
        const modalEd = document.getElementById("modalEditar");
        const modal = bootstrap.Modal.getInstance(modalEd);
        if (modal) {
            modal.hide();
        }
        showModal({
            title: 'Produto atualizado com sucesso',
            body: '<p>As informações foram salvas.</p>',
            buttonText: 'Voltar',
            buttonClass: 'btn-success'
        });
        document.getElementById('modalBotao').onclick = function () {
            window.location.reload();
        };

    } else {
        showModal({
            title: 'Erro ao atualizar',
            body: '<p>Não foi possível salvar as alterações.</p>',
            buttonText: 'Voltar',
            buttonClass: 'btn-danger'
        });
    }
}
async function ListarProdutos() {
    const container = document.getElementById("listaProdutos");

    if (!container) return;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/Products?select=*`, {
        method: "GET",
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        }
    });

    const produtos = await response.json();
    container.innerHTML = ''

    produtos.forEach(produto => {
        let linha = container.insertRow()

        linha.insertCell(0).innerHTML = `${produto.id}`
        linha.insertCell(1).innerHTML = `${produto.nome}`
        linha.insertCell(2).innerHTML = `${produto.descricao}`
        linha.insertCell(3).innerHTML = `${produto.qtd}`
        linha.insertCell(4).innerHTML = `R$ ${produto.valor}`


        let btn = document.createElement("button")
        btn.className = 'btn btn-warning'
        btn.innerHTML = '<i class="fas fa-edit"></i>'
        linha.insertCell(5).append(btn)
        btn.onclick = function () {
            modificarProduto(produto.id);
        }

        btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.onclick = function () {
            removerProduto(produto.id);
        }
        linha.insertCell(6).append(btn)
    })
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
function logout() {
    localStorage.removeItem("usuarioLogado");
    location.reload();
}
// Carrega automaticamente quando abrir a página
document.addEventListener("DOMContentLoaded", function () {
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    aplicarPermissoes();
    if (usuarioLogado && usuarioLogado.tipo === "admin") {
        ListarProdutos();
    }
    const loginLink = document.getElementById("loginLink");

    if (usuarioLogado) {
        
        loginLink.innerHTML = '<i class="fa-solid fa-user"></i> Sair';
        loginLink.onclick = logout;
    }
    carregarProdutos();

});