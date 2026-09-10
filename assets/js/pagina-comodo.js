document.addEventListener("DOMContentLoaded", () => {
    const listaEl = document.getElementById("lista-dispositivos");
    const conteudo = document.querySelector('.conteudo');
    
    if (!listaEl) return;

    const comodo = document.body.dataset.comodo;
    const dispositivos = porComodo(comodo);

    listaEl.innerHTML = "";
    if(dispositivos.length > 0){
        dispositivos.forEach(d => {
            const item = document.createElement("div");
            item.className = "aparelho";
            item.textContent = d.nome;
            listaEl.appendChild(item);
        });
    } else {
        conteudo.innerHTML = "<h1 style='text-align:center'>Não há dispositivos cadastrados!</h1>"
    }
});