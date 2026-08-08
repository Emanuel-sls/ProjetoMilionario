const nome = document.getElementById("nomeComp");
const cpf = document.getElementById("cpf");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

const variaveis = [nome, cpf, email, senha];

const mensagens = [
    {input: nome, mensagem: "Digite o nome completo"},
    {input: cpf, mensagem: "Digite o CPF"},
    {input: email, mensagem: "Digite o email"},
    {input: senha, mensagem: "Digite a senha"}
];

function verificacao(mensagens){
    variaveis.forEach((campo) => {
        if(campo.input.value === ""){
            alert(campo.mensagem)
        }
    });
};

const btn_cadastrar = document.getElementById("cadastrar");

btn_cadastrar.addEventListener("click", () => {
    verificacao();
});