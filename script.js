const formulario = document.querySelector(".formulario");
const inputTexto = document.querySelector(".text-input");
const listadDeTarefas = document.querySelector(".lista");
const deletarTarefa = document.querySelector(".excluir");
const filtroForm = document.querySelector(".filtro")
const inputFiltro = document.querySelector(".input-filtro");

const tarefas = [];

function renderizaTarefas() {
    tarefas.forEach((tarefa) => {
        listadDeTarefas.innerHTML += `
            <li class="list-item">
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
        e.target.closest(".list-item").remove();
    }
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("editar")) {
        const tarefaEditada = prompt("Digite a nova descrição da tarefa:");
        const descricaoAtual = e.target.closest(".list-item").querySelector(".titulo-tarefa");  
        descricaoAtual.textContent = tarefaEditada;
    }
})

filtroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const idDigitado = Number(inputFiltro.value);
    const tarefaFiltrada = tarefas.find((tarefa) => tarefa.id === idDigitado);

    listadDeTarefas.innerHTML = '';
    inputFiltro.value = '';
    console.log(tarefaFiltrada);
    
    listadDeTarefas.innerHTML = renderizaTarefaFiltrada(tarefaFiltrada)
})

function renderizaTarefaFiltrada(tarefa) {
    return `
            <li class="list-item">
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









