document.addEventListener("DOMContentLoaded", () => {
    const listaEl = document.getElementById("lista-dispositivos");
    if (!listaEl) return;

    const comodo = document.body.dataset.comodo;
    const dispositivos = porComodo(comodo);

    listaEl.innerHTML = "";

    dispositivos.forEach(d => {
        const item = document.createElement("div");
        item.className = "aparelho";
        item.textContent = d.nome;
        listaEl.appendChild(item);
    });
});