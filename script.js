const formulario = document.querySelector(".formulario");
const inputTexto = document.querySelector(".text-input");
const listadDeTarefas = document.querySelector(".lista");
const deletarTarefa = document.querySelector(".excluir")

// const tarefas = [
//     {
//         id: 1,
//         descricao: "Revisar o código",
//         concluida: false
//     },
//     {
//         id: 2,
//         descricao: "Desenvolver e manter",
//         concluida: false
//     },
//     {
//         id: 3,
//         descricao: "Testar",
//         concluida: false
//     }
// ]

// tarefas.forEach((tarefa) => {
//     listadDeTarefas.innerHTML += `
//         <li>
//             <div class="checkbox-container">
//                 <input type="checkbox" name="" id="checkbox">
//                 <label for="checkbox" class="titulo-tarefa">${tarefa.descricao}</label>
//             </div>
            
//             <div class="btns-container">
//                 <button>
//                     <img src="assets/edit.svg" alt="">
//                 </button>
//                 <button class="excluir">
//                     <img src="assets/delete.svg" alt="">
//                 </button>
//             </div>
//         </li>
//     ` 
// })

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const textoDigitado = inputTexto.value;

    listadDeTarefas.innerHTML += `
        <li>
            <div class="checkbox-container">
                <input type="checkbox" name="" id="checkbox">
                <label for="checkbox" class="titulo-tarefa">${textoDigitado}</label>
            </div>
            
            <div class="btns-container">
                <button>
                    <img src="assets/edit.svg" alt="">
                </button>
                <button class="excluir">
                    <img src="assets/delete.svg" alt="">
                </button>
            </div>
        </li>
    ` 
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("excluir")) {
        e.target.parentElement.parentElement.parentElement.remove();
    }
})





