const button = document.querySelector('.button_add_task')
const input = document.querySelector('.input_task')
const listaCompleta = document.querySelector('.list_tasks')

button.addEventListener('click', adicionarNovaTarefa)

let minhaListaDeItens = []

function adicionarNovaTarefa() {

    if (input.value.trim() === "") {
        alert("Você precisa preencher o campo!");
        return;
    }

    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false,
    })

    input.value = ''

    mostrarTarefas()
}

function mostrarTarefas() {
    let novaLi = ''

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi =
            novaLi +
            `
        <li class="task ${item.concluida && 'done'}">
            <img src="./images/ok.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./images/lixo.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
        `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    mostrarTarefas()
}

recarregarTarefas()

function keyEnter() {
    input.addEventListener("keydown", (e) => {
        e.keyCode === 13 && adicionarNovaTarefa()
    })
}

keyEnter()