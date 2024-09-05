const formulario = document.querySelector(".formulario");
const inputTexto = document.querySelector(".text-input");
const listadDeTarefas = document.querySelector(".lista");
const deletarTarefa = document.querySelector(".excluir");
const filtroForm = document.querySelector(".filtro")
const inputFiltro = document.querySelector(".input-filtro");
const limparFiltro = document.querySelector(".limpar-filtro");

const tarefas = [];

function renderizaTarefas() {
    tarefas.forEach((tarefa) => {
        listadDeTarefas.innerHTML += `
            <li class="list-item" id="${tarefa.id}">
                <div class="checkbox-container">
                    <input type="checkbox" name="" id="checkbox${tarefa.id}">
                    <label for="checkbox${tarefa.id}" class="titulo-tarefa">${tarefa.id}. ${tarefa.descricao}</label>
                </div>
                
                <div class="btns-container">
                    <button class="editar">
                        
                    </button>
                    <button class="excluir">
                        
                    </button>
                </div>
            </li>
    ` 
    })   
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputTexto.value === "" || inputTexto.value.length <= 3) {
        alert("Por favor, digite uma descrição válida!")
        return;
    }
    
    const idTarefa = tarefas.length + 1;
    const textoDigitado = inputTexto.value;

    const novaTarefa = {
        id: idTarefa,
        descricao: textoDigitado,
        concluida: false
    }

    tarefas.push(novaTarefa);
    listadDeTarefas.innerHTML = ""
    renderizaTarefas();
    inputTexto.value = "";
    inputTexto.focus();
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("excluir")) {

        const listItem = e.target.closest(".list-item");
        const id = Number(listItem.id);
        listItem.remove();


        const index = tarefas.findIndex((tarefa) => tarefa.id === id);
        if (index !== -1) {
            tarefas.splice(index, 1);
            tarefas.forEach((tarefa, i) => {
                tarefa.id = i + 1;
            });
            listadDeTarefas.innerHTML = ''
            renderizaTarefas();
        }
    }
});


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("editar")) {
        const tarefaEditada = prompt("Digite a nova descrição da tarefa:");
        const descricaoAtual = e.target.closest(".list-item").querySelector(".titulo-tarefa");  
        descricaoAtual.textContent = tarefaEditada;
    }
})

filtroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputFiltro.value === "0" || inputFiltro.value.length <= 0 || inputFiltro.value > tarefas.length) {
        alert("Por favor, digite um id válido para filtrar a tarefa!")
        return;
    }

    const idDigitado = Number(inputFiltro.value);
    const tarefaFiltrada = tarefas.find((tarefa) => tarefa.id === idDigitado);

    listadDeTarefas.innerHTML = '';
    inputFiltro.value = '';
    console.log(tarefaFiltrada);
    
    listadDeTarefas.innerHTML = renderizaTarefaFiltrada(tarefaFiltrada)
})

function renderizaTarefaFiltrada(tarefa) {
    return `
            <li class="list-item" id="${tarefa.id}">
                <div class="checkbox-container">
                    <input type="checkbox" name="" id="checkbox${tarefa.id}">
                    <label for="checkbox${tarefa.id}" class="titulo-tarefa">${tarefa.id}. ${tarefa.descricao}</label>
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
    listadDeTarefas.innerHTML = "";
    renderizaTarefas();
})








