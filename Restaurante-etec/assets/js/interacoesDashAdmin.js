//Cadastro e gerenciamento de categorias

const nomeCategoria = document.getElementById("nomeCateg");
const descricaoCategoria = document.getElementById("descricaoCateg");
const btnSaveCategoria = document.getElementById("btnSalvCategoria");

function verificarCamposCategoria() {
    if (nomeCategoria.input.value.trim() === ""){
        return alert("O campo nome da categoria não pode estar vazio");
    }

    if (descricaoCategoria.textarea.value.trim() === ""){
        return alert("O campo da descrição da categoria não pode estar vazio");
    }
}


btnSaveCategoria.addEventListener("click", verificarCamposCategoria);