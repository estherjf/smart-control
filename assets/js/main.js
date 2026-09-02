const diasdasemana = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
let usuario = "";

function DataAtual() {
    const dataagora = new Date();
    const nomedia = diasdasemana[dataagora.getDay()];
    const dia = dataagora.getDate();
    const mes = dataagora.getMonth();
    const ano = dataagora.getFullYear();
    const hora = dataagora.getHours();
    const minutos = String(dataagora.getMinutes()).padStart(2, '0');
    return `${nomedia}, ${dia}/${mes + 1} de ${ano} - ${hora}:${minutos}`;
}

function atualizarDataHora() {
    document.getElementById("resultado").textContent = `Olá, ${usuario || "visitante"}! Hoje é ${DataAtual()}`;
}

function mensagem() {
    usuario = prompt("Digite seu nome:") || "visitante";
    atualizarDataHora();
    setInterval(atualizarDataHora, 60000);
}


function iniciarBusca() {
    const campoBusca = document.getElementById("campoBusca");
    const comodos = document.querySelectorAll(".link-card");
    const linhasTabela = document.querySelectorAll("#tabelaAcessos tbody tr");

    campoBusca.addEventListener("input", (e) => {
        console.log(e.target.value)
        const termo = campoBusca.value.trim().toLowerCase();

        comodos.forEach((item) => {
            const nome = item.dataset.nome.toLowerCase();
            item.hidden = !nome.includes(termo);
        });

        linhasTabela.forEach((linha) => {
            const colunas = Array.from(linha.children);
            const corresponde = colunas.some((c) => c.textContent.toLowerCase().includes(termo));
            linha.hidden = !corresponde;
        });
    });
}


function iniciarTema() {
    const btnTema = document.getElementById("btnTema");
    const iconeTema = document.getElementById("iconeTema");

    if (localStorage.getItem("tema") === "escuro") {
        document.body.classList.add("dark-theme");
        iconeTema.textContent = "modo claro";
    }

    btnTema.addEventListener("click", () => {
        const escuroAtivo = document.body.classList.toggle("dark-theme");
        iconeTema.textContent = escuroAtivo ? "modo claro" : "modo escuro";
        localStorage.setItem("tema", escuroAtivo ? "escuro" : "claro");
    });
}


function iniciarMenuLateral() {
    const btnMenu = document.getElementById("btnMenu");
    const btnFechar = document.getElementById("btnFecharMenu");
    const sidebar = document.getElementById("sidebarMenu");
    const overlay = document.getElementById("overlayMenu");

    const abrirMenu = () => {
        sidebar.classList.add("aberto");
        overlay.classList.add("ativo");
    };
    const fecharMenu = () => {
        sidebar.classList.remove("aberto");
        overlay.classList.remove("ativo");
    };

    btnMenu.addEventListener("click", abrirMenu);
    btnFechar.addEventListener("click", fecharMenu);
    overlay.addEventListener("click", fecharMenu);

    sidebar.querySelectorAll("[data-fecha-menu]").forEach((link) => {
        link.addEventListener("click", (evento) => {
            const destino = link.getAttribute("href");
            if (destino.startsWith("#")) {
                evento.preventDefault();
                document.querySelector(destino).scrollIntoView({ behavior: "smooth" });
            }
            fecharMenu();
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    mensagem();
    iniciarBusca();
    iniciarTema();
    iniciarMenuLateral();
});