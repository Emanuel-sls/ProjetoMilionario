//função que fiz para ser reutilizada mais de uma vez com cada uma das ancoras de rolagem
function scrollSuave(comandId, destinoId){

    const comand = document.getElementById(comandId);

    comand.addEventListener("click", () => {
        document.getElementById(destinoId).scrollIntoView({behavior: "smooth"});
    });

}

//isso aqui é para definir a função para cada lugar ela deve executar o trabalho dela
scrollSuave("toCategorias", "categoria");
scrollSuave("toProdutos", "produto");
scrollSuave("toPedidos", "pedido");
scrollSuave("toMesas", "mesas");
scrollSuave("toRelatorios", "relatorios");


//troca de pagina, para cadastro de funcionarios
const toCadastro = document.getElementById("toCadastro");

toCadastro.addEventListener("click", () => {
    location.href="pagCadadm.php";
});


//widgetsde mensagem de sucesso e erro
const mensagemContainer = document.getElementById("mensagemContainer");

const mensagemSucesso = document.getElementById("mensagemSucesso");
const mensagemErro = document.getElementById("mensagemErro");
const campo_msgVazio = document.getElementById("campo_msgVazio");

const btn_sucesso = document.querySelector(".btn-sucesso");
const btn_erro = document.querySelector(".btn-erro");

//funcao mostrar widget de sucesso
function msgSucesso(){
    mensagemContainer.classList.add("ativo");

    mensagemSucesso.style.display = "block";
    mensagemErro.style.display = "none";

    btn_sucesso.addEventListener("click", () => {
        mensagemContainer.classList.remove("ativo");
    });
}

//funcao mostrar widget de erro
function msgErro(){
    mensagemContainer.classList.add("ativo");

    mensagemSucesso.style.display = "none";
    mensagemErro.style.display = "block";


    btn_erro.addEventListener("click", () => {
        mensagemContainer.classList.remove("ativo");
    });
}


//função reutilizavel para verificação de campos
function validarCampos(campos){
    for(const entrada of campos){
        if(entrada.input.value.trim() === ""){
            campo_msgVazio.textContent = entrada.mensagem;
            msgErro();
            return false;
        }
    }

    return true;
}

//requisicao de dados
//salvar categorias
const nomeCategoria = document.getElementById("nomeCateg");
const descCategoria = document.getElementById("descCateg");
const btn_salvarCateg = document.getElementById("btn1");


//salvar produtos
const nomeProd = document.getElementById("nomeProd");
const selecCateg = document.getElementById("opcoes");
const quantidade = document.getElementById("quantidade");
const preco = document.getElementById("precProd");
const descProd = document.getElementById("descProd");
const btn_salvarProd = document.getElementById("btn3");


//Mesas
const numeroDeMesa = document.getElementById("numMesa");
const descMesa = document.getElementById("descMesa");
const btn_cadastrarMesa = document.getElementById("btn5");


//estruturas de dados para validação de campos
const camposCategorias = [
    {input: nomeCategoria, mensagem: "O nome da categoria é obrigatório!"},
    {input: descCategoria, mensagem: "A descrição da categoria é obrigatória!"}
];

const camposProdutos = [
    {input: nomeProd, mensagem: "O nome do produto é obrigatório!"},
    {input: selecCateg, mensagem: "A categoria do produto é obrigatória!"},
    {input: quantidade, mensagem: "A quantidade do produto é obrigatória!"},
    {input: preco, mensagem: "O preço do produto é obrigatório!"},
    {input: descProd, mensagem: "A descrição do produto é obrigatória!"}
];

const camposMesa = [
    {input: numeroDeMesa, mensagem: "O número da mesa é obrigatório!"},
    {input: descMesa, mensagem: "A descrição da mesa é obrigatória!"}
];


//salvar categorias
btn_salvarCateg.addEventListener("click", (event) => {

    //preventDefault eu to usando para previnir que caso um formulario esteja vazio a pagina não recarregue sozinha
    if(!validarCampos(camposCategorias)){
        event.preventDefault();
        return;
    }

    msgSucesso();
});

//salvar produtos
btn_salvarProd.addEventListener("click", (event) => {

    if(!validarCampos(camposProdutos)){
        event.preventDefault();
        return;
    }

    msgSucesso();
});

//salvar mesas
btn_cadastrarMesa.addEventListener("click", (event) => {

    if(!validarCampos(camposMesa)){
        event.preventDefault();
        return;
    }
    msgSucesso();
});