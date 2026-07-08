const nomeCompleto = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

const entradas = [
    {input: nomeCompleto, mensagem: "Digite seu nome completo. (Obrigatório)"},
    {input: email, mensagem: "Digite seu email. (Obrigatório)"},
    {input: senha, mensagem: "Digite sua senha. (Obrigatório)"}
];


function validarEntradas(){
    for(entrada of entradas){
        if(entrada.input.value.trim() === ""){
            return alert(entrada.mensagem);
        }
    }
};

//btnLog é onde vai validar os campos
const btnLog = document.getElementById("btnLog");
btnLog.addEventListener("click", validarEntradas);