const diasdasemana =[
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]
let usuario= "";

function DataAtual(){
    const dataagora = new Date();

    const nomedia = diasdasemana[dataagora.getDay()];
    const dia = dataagora.getDate();
    const mes = dataagora.getMonth();
    const ano = dataagora.getFullYear();
    const hora = dataagora.getHours();
    const minutos = String(dataagora.getMinutes()).padStart(2, '0');

    const fusohorario = Intl.DateTimeFormat("pt-BR", {timeZoneName: "longOffset"});
    const fuso = fusohorario.formatToParts(dataagora).find(part => part.type === "timeZoneName").value;
    return `${nomedia}, ${dia}/${mes + 1} de ${ano} - ${hora}:${minutos} (${fuso})`;
}

function atualizarDataHora() {
    document.getElementById("resultado").textContent = `Olá, ${usuario}! Hoje é ${DataAtual()}`;
}
function mensagem(){
    const usuario = prompt("Digite seu nome:");
    atualizarDataHora();
    setInterval(atualizarDataHora, 60000); 
    const dataAtual = DataAtual();

    document.getElementById("resultado").textContent = `Olá, ${usuario}! Hoje é ${dataAtual}`;
}
mensagem();

