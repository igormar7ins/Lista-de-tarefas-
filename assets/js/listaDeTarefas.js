
const CHAVE_STORAGE = 'listaDeTarefasApp';

class GerenciadorDeTarefas {
    constructor() {
        this.ulLista = document.getElementById('listaDeTarefas');
        this.input = document.getElementById('inputTarefa');
        this.carregarTarefasDoStorage();

        document.getElementById('btnAdicionar').addEventListener('click', () => this.adicionarTarefa());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.adicionarTarefa();
            } 
        });

        // Renderiza a lista carregada imediatamente
        this.renderizarTarefas();
    }

    //Carrega os dados salvos
    carregarTarefasDoStorage() {
        // 1. Pega a string salva no localStorage
        const tarefasSalvas = localStorage.getItem(CHAVE_STORAGE);

        if (tarefasSalvas) {
            // 2. Se houver dados, converte a string de volta para um objeto/array JS
            this.tarefas = JSON.parse(tarefasSalvas);
        } else {
            // 3. Se não houver dados, inicia com um array vazio
            this.tarefas = [];
        }
    }

    // NOVO MÉTODO: Salva o array atual no localStorage
    salvarTarefasNoStorage() {
        // O localStorage só aceita strings. JSON.stringify() converte o array JS para uma string.
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(this.tarefas));
    }

    adicionarTarefa() {
        const textoTarefa = this.input.value.trim();

        if (textoTarefa) {
            this.tarefas.push({
                id: Date.now(),
                texto: textoTarefa
            });

            this.input.value = '';
            this.salvarTarefasNoStorage();
            this.renderizarTarefas();
        } else {
            alert("Por favor, digite o nome de uma tarefa.");
        }
    }

    removerTarefa(id) {
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
        this.salvarTarefasNoStorage();
        this.renderizarTarefas();
    }

    // O método renderizarTarefas() continua o mesmo
    renderizarTarefas() {
        // ... (código do renderizarTarefas() aqui) ...
        this.ulLista.innerHTML = '';

        this.tarefas.forEach(tarefa => {
            // ... (código de criação de LI e botão aqui) ...
            const li = document.createElement('li');
            li.textContent = tarefa.texto;
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.style.marginLeft = '10px';
            btnRemover.addEventListener('click', () => this.removerTarefa(tarefa.id));
            li.appendChild(btnRemover);
            this.ulLista.appendChild(li);
        });
    }
}

const meuGerenciador = new GerenciadorDeTarefas();