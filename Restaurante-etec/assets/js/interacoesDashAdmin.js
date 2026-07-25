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




//função reutilizavel para verificação de campos
function validarCampos(campos){
    for(const entrada of campos){
        if(entrada.input.value.trim() === ""){
            alert(entrada.mensagem);
            return false;
        }
    }

    return true;
}

//salvar categorias
const nomeCategoria = document.getElementById("nomeCateg");
const descCategoria = document.getElementById("descCateg");

const camposCategorias = [
    {input: nomeCategoria, mensagem: "O nome é obrigatório!"},
    {input: descCategoria, mensagem: "A descrição é obrigatória!"}
]

//botão de salvar categoria
const btn_salvarCateg = document.getElementById("btn1");

btn_salvarCateg.addEventListener("click", (event) => {

    //preventDefault eu to usando para previnir que caso um formulario esteja vazio a pagina não recarregue sozinha
    if(!validarCampos(camposCategorias)){
        event.preventDefault();
        return;
    }
});




//salvar produtos
const nomeProd = document.getElementById("nomeProd");
const selecCateg = document.getElementById("opcoes");
const quantidade = document.getElementById("quantidade");
const preco = document.getElementById("precProd");
const descProd = document.getElementById("descProd");

const camposProdutos = [
    {input: nomeProd, mensagem: "O nome do produto é obrigatório!"},
    {input: selecCateg, mensagem: "A categoria é obrigatória!"},
    {input: quantidade, mensagem: "A quantidade é obrigatória!"},
    {input: preco, mensagem: "O preço é obrigatório!"},
    {input: descProd, mensagem: "A descrição de obrigatória!"}
];

//const botão de salvar produto
const btn_salvarProd = document.getElementById("btn3");

btn_salvarProd.addEventListener("click", (event) => {

    if(!validarCampos(camposProdutos)){
        event.preventDefault();
        return;
    }
});


//Mesas
const numeroDeMesa = document.getElementById("numMesa");
const descMesa = document.getElementById("descMesa");

const camposMesa = [
    {input: numeroDeMesa, mensagem: "O numero de mesa é obrigatório!"},
    {input: descMesa, mensagem: "A descrição de obrigatória!"}
];


const btn_cadastrarMesa = document.getElementById("btn5");

btn_cadastrarMesa.addEventListener("click", (event) => {

    if(!validarCampos(camposMesa)){
        event.preventDefault();
        return;
    }
});