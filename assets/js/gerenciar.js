let idEditando = null;

document.addEventListener("DOMContentLoaded", () => {
    renderizarLista();

    const form = document.getElementById("form-dispositivo");
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nome = document.getElementById("nome-dispositivo").value.trim();
        const comodo = document.getElementById("comodo-dispositivo").value;
        if (!nome || !comodo) return;

        if (idEditando) {
            editar(idEditando, nome, comodo);
            idEditando = null;
        } else {
            adicionar(nome, comodo);
        }

        form.reset();
        document.getElementById("botao-salvar").textContent = "Cadastrar dispositivo";
        renderizarLista();
    });

    document.getElementById("lista-todos").addEventListener("click", (evento) => {
        const botao = evento.target.closest("button");
        if (!botao) return;

        const id = Number(botao.closest(".item").dataset.id);

        if (botao.classList.contains("btn-remover")) {
            if (confirm("Remover este dispositivo?")) {
                remover(id);
                renderizarLista();
            }
        }

        if (botao.classList.contains("btn-editar")) {
            const dispositivo = pegarDispositivos().find(d => d.id === id);
            idEditando = id;
            document.getElementById("nome-dispositivo").value = dispositivo.nome;
            document.getElementById("comodo-dispositivo").value = dispositivo.comodo;
            document.getElementById("botao-salvar").textContent = "Salvar alterações";
        }
    });
});

function renderizarLista() {
    const listaEl = document.getElementById("lista-todos");
    listaEl.innerHTML = "";

    pegarDispositivos().forEach(d => {
        const item = document.createElement("div");
        item.className = "item";
        item.dataset.id = d.id;
        item.innerHTML = `
            <span>${d.nome} — ${d.comodo}</span>
            <button class="btn-editar">renomear</button>
            <button class="btn-remover">remover dispositivo</button>
        `;
        listaEl.appendChild(item);
    });
}