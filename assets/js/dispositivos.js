const CHAVE = "dispositivos";

function pegarDispositivos() {
    return JSON.parse(localStorage.getItem(CHAVE)) || [];
}

function salvarDispositivos(lista) {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
}

function adicionar(nome, comodo) {
    const lista = pegarDispositivos();
    lista.push({ id: Date.now(), nome, comodo, status: "desligado" });
    salvarDispositivos(lista);
}

function remover(id) {
    salvarDispositivos(pegarDispositivos().filter(d => d.id !== id));
}

function editar(id, nome, comodo) {
    const lista = pegarDispositivos();
    const d = lista.find(d => d.id === id);
    d.nome = nome;
    d.comodo = comodo;
    salvarDispositivos(lista);
}

function porComodo(comodo) {
    return pegarDispositivos().filter(d => d.comodo === comodo);
}