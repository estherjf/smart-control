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
    const elementoResultado = document.getElementById("resultado");
    if (!elementoResultado) {
        return;
    }

    elementoResultado.textContent = `Olá, ${usuario || "visitante"}! Hoje é ${DataAtual()}`;
}

function mensagem() {
    const elementoResultado = document.getElementById("resultado");
    if (!elementoResultado) {
        return;
    }

    usuario = prompt("Digite seu nome:") || "visitante";
    atualizarDataHora();
    setInterval(atualizarDataHora, 60000);
}


function iniciarBusca() {
    const campoBusca = document.getElementById("campoBusca");
    if (!campoBusca) {
        return;
    }

    const comodos = document.querySelectorAll(".link-card");
    const linhasTabela = document.querySelectorAll("#tabelaAcessos tbody tr");

    campoBusca.addEventListener("input", (e) => {
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


function salvarTema(escuroAtivo) {
    const tema = escuroAtivo ? "escuro" : "claro";

    try {
        localStorage.setItem("tema", tema);
    } catch (erro) {
        console.warn("Não foi possível salvar o tema no localStorage:", erro);
    }

    document.cookie = `tema=${tema}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

function obterTema() {
    try {
        const temaSalvo = localStorage.getItem("tema");
        if (temaSalvo === "escuro" || temaSalvo === "claro") {
            return temaSalvo;
        }
    } catch (erro) {
        console.warn("Não foi possível ler o tema do localStorage:", erro);
    }

    const cookie = document.cookie
        .split("; ")
        .find((item) => item.startsWith("tema="));

    return cookie ? cookie.split("=")[1] : null;
}

function aplicarTemaSalvo() {
    const temaSalvo = obterTema();

    if (temaSalvo === "escuro") {
        document.body.classList.add("dark-theme");
    }

    const btnTema = document.getElementById("btnTema");
    if (btnTema) {
        const escuroAtivo = document.body.classList.contains("dark-theme");
        btnTema.setAttribute("aria-label", escuroAtivo ? "Ativar modo claro" : "Ativar modo escuro");
        btnTema.title = escuroAtivo ? "Ativar modo claro" : "Ativar modo escuro";
    }
}

function iniciarTema() {
    const btnTema = document.getElementById("btnTema");

    if (!btnTema) {
        return;
    }

    const temaSalvo = obterTema();
    if (temaSalvo === "escuro") {
        document.body.classList.add("dark-theme");
        btnTema.setAttribute("aria-label", "Ativar modo claro");
        btnTema.title = "Ativar modo claro";
    }

    btnTema.addEventListener("click", () => {
        const escuroAtivo = document.body.classList.toggle("dark-theme");
        btnTema.setAttribute("aria-label", escuroAtivo ? "Ativar modo claro" : "Ativar modo escuro");
        btnTema.title = escuroAtivo ? "Ativar modo claro" : "Ativar modo escuro";
        salvarTema(escuroAtivo);
    });
}


function iniciarMenuLateral() {
    const btnMenu = document.getElementById("btnMenu");
    const btnFechar = document.getElementById("btnFecharMenu");
    const sidebar = document.getElementById("sidebarMenu");
    const overlay = document.getElementById("overlayMenu");

    if (!btnMenu || !sidebar || !overlay) {
        return;
    }

    const abrirMenu = () => {
        sidebar.classList.add("aberto");
        overlay.classList.add("ativo");
    };
    const fecharMenu = () => {
        sidebar.classList.remove("aberto");
        overlay.classList.remove("ativo");
    };

    btnMenu.addEventListener("click", abrirMenu);
    if (btnFechar) {
        btnFechar.addEventListener("click", fecharMenu);
    }
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
    aplicarTemaSalvo();
    mensagem();
    iniciarBusca();
    iniciarTema();
    iniciarMenuLateral();
});