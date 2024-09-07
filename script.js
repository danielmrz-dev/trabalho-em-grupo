const formulario = document.querySelector(".formulario");
const inputTexto = document.querySelector(".input-adicionar");
const listadDeProdutos = document.querySelector(".lista");
const deletarproduto = document.querySelector(".excluir");
const filtroForm = document.querySelector(".filtro")
const inputFiltro = document.querySelector(".input-filtro");
const limparFiltro = document.querySelector(".btn-limpar-filtro");

const produtos = [];

function renderizaprodutos() {
    produtos.forEach((produto) => {
        listadDeProdutos.innerHTML += `
            <li class="list-item" id="${produto.id}">
                <div class="checkbox-container">
                    <input type="checkbox" name="" id="checkbox${produto.id}">
                    <label for="checkbox${produto.id}" class="titulo-produto">${produto.id}. ${produto.descricao}</label>
                </div>
                
                <div class="btns-container">
                    <abbr title="Editar produto">
                    <button class="editar">
                        
                    </button>                    
                    </abbr>
                    
                    <abbr title="Excluir produto">
                    <button class="excluir">
                        
                    </button>                    
                    </abbr>
                </div>
            </li>
    ` 
    })   
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputTexto.value === "" || inputTexto.value.length < 3) {
        alert("A descrição do produto deve ter pelo menos 3 caracteres!");
        return;
    }

    const textoDigitado = inputTexto.value.trim();

    const produtoExistente = produtos.find(produto => produto.descricao.toLowerCase() === textoDigitado.toLowerCase());
    if (produtoExistente) {
        alert("O produto já foi adicionado!");
        inputTexto.value = "";
        return;
    }

    const idproduto = produtos.length + 1;

    const novoProduto = {
        id: idproduto,
        descricao: textoDigitado,
    };

    produtos.push(novoProduto);
    listadDeProdutos.innerHTML = "";
    renderizaprodutos();
    inputTexto.value = "";
    inputTexto.focus();
});


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("excluir")) {

        const listItem = e.target.closest(".list-item");
        const id = Number(listItem.id);
        listItem.remove();


        const index = produtos.findIndex((produto) => produto.id === id);
        if (index !== -1) {
            produtos.splice(index, 1);
            produtos.forEach((produto, i) => {
                produto.id = i + 1;
            });
            listadDeProdutos.innerHTML = ''
            renderizaprodutos();
        }
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("editar")) {
        let produtoEditada = prompt("Digite a nova descrição da produto:");
                
        if (produtoEditada !== null) {
            produtoEditada = produtoEditada.trim();

            if (produtoEditada.length < 3) {
                alert("A descrição do produto deve ter pelo menos 3 caracteres!");                
                return;
            }

            const produtoExistente = produtos.find(produto => produto.descricao.toLowerCase() === produtoEditada.toLowerCase());
            if (produtoExistente) {
                alert("O produto já existe na lista!");
                inputTexto.value = "";
                return;
            }
            
            const descricaoAtual = e.target.closest(".list-item").querySelector(".titulo-produto");
            descricaoAtual.textContent = `${descricaoAtual.textContent.split('.')[0]}. ${produtoEditada}`;
        }
    }
});

filtroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputFiltro.value === "0" || inputFiltro.value.length <= 0 || inputFiltro.value > produtos.length) {
        alert("Por favor, digite um id válido para filtrar a produto!")
        return;
    }

    const idDigitado = Number(inputFiltro.value);
    const produtoFiltrada = produtos.find((produto) => produto.id === idDigitado);

    listadDeProdutos.innerHTML = '';
    inputFiltro.value = '';
    console.log(produtoFiltrada);
    
    listadDeProdutos.innerHTML = renderizaprodutoFiltrada(produtoFiltrada)
})

function renderizaprodutoFiltrada(produto) {
    return `
            <li class="list-item" id="${produto.id}">
                <div class="checkbox-container">
                    <input type="checkbox" name="" id="checkbox${produto.id}">
                    <label for="checkbox${produto.id}" class="titulo-produto">${produto.id}. ${produto.descricao}</label>
                </div>
                
                <div class="btns-container">
                    <button class="editar">
                        
                    </button>
                    <button class="excluir">
                        
                    </button>
                </div>
            </li>
    `
}

limparFiltro.addEventListener("click", (e) => {
    e.preventDefault()
    listadDeProdutos.innerHTML = "";
    renderizaprodutos();
})