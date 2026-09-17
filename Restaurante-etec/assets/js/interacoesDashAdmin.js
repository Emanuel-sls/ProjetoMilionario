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
    location.href="pagCadadm.html";
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
const buscaNomeCategoria = document.getElementById("nomeCateg");
const buscaDescCategoria = document.getElementById("descCateg");
const btn_salvarCateg = document.getElementById("btn1");
const btn_editarCateg = document.getElementById("btn2");
btn_editarCateg.style.display = "none";


//salvar produtos
const nomeProd = document.getElementById("nomeProd");
const selecCateg = document.getElementById("opcoesCatDoProduto");
const quantidade = document.getElementById("quantidade");
const preco = document.getElementById("precProd");
const descProd = document.getElementById("descProd");
const btn_salvarProd = document.getElementById("btn3");
const btn_editarProd = document.getElementById("btn4");
btn_editarProd.style.display = "none";


//Mesas
const numeroDeMesa = document.getElementById("numMesa");
const descMesa = document.getElementById("descMesa");
const btn_cadastrarMesa = document.getElementById("btn5");




//estruturas de dados para validação de campos
const camposCategorias = [
    {input: buscaNomeCategoria, mensagem: "O nome da categoria é obrigatório!"},
    {input: buscaDescCategoria, mensagem: "A descrição da categoria é obrigatória!"}
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




//salvar mesas
btn_cadastrarMesa.addEventListener("click", (event) => {

    if(!validarCampos(camposMesa)){
        event.preventDefault();
        return;
    }
    msgSucesso();
});



//SALVAR CATEGORIAS -------------------------------------------------------------------
btn_salvarCateg.addEventListener("click", (event) => {

    //preventDefault eu to usando para previnir que caso um formulario esteja vazio a pagina não recarregue sozinha
    if(!validarCampos(camposCategorias)){
        event.preventDefault();
        return;
    }

    const nomeCateg = buscaNomeCategoria.value
    const descCateg = buscaDescCategoria.value

    const novaCategoria = fetch('https://providers-richmond-paris-playstation.trycloudflare.com/categorias', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            nomeCategoria: nomeCateg,
            descCategoria: descCateg
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Categoria cadastrada com sucesso!');
            msgSucesso();
        } else {
            console.log('Erro ao cadastrar a categoria.');
        }
    })
});

let idUpdate;

(async function recebeDadosCategorias(){
            const req = await fetch('https://providers-richmond-paris-playstation.trycloudflare.com/categorias/listar')
            const covertendoEmJSON = await req.json();

            for (const exib of covertendoEmJSON) {

                console.log("Categoria: " , exib.nomeCategoria);

                const container = document.getElementById('tabelaCategoria')
                container.innerHTML += `
                    <tr class="linha">
                        <td>${exib.id}</td>
                        <td class="nomeCateg">${exib.nomeCategoria}</td>
                        <td class="descCateg">${exib.descCategoria}</td>
                        <td>
                            <button class="btnEditar" data-id="${exib.id}" type="button">Editar</button>
                            <button class="btnExcluir" data-id="${exib.id}" type="button">Excluir</button>
                        </td>
                    </tr>
                    
                `
            };



            const btnExcluirList = document.querySelectorAll('.btnExcluir');
            const btnEditarList = document.querySelectorAll('.btnEditar');
            const linhaTal = document.querySelectorAll('.linha');


            btnExcluirList.forEach((btn , index) => {
                btn.addEventListener('click', () => {

                    const idDeletCateg = btn.dataset.id;

                    const deleteCateg = fetch(`https://providers-richmond-paris-playstation.trycloudflare.com/categorias/${idDeletCateg}`, {
                        method: 'DELETE',

                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })

                    .then(response => {
                        if (response.ok) {
                            console.log('Categoria deletada com sucesso!');
                        } else {
                            console.log('Erro ao deletar a categoria.');
                        }});


                    linhaTal[index].remove();
                });
            });

            btnEditarList.forEach((btn , index) => {
                btn.addEventListener('click', () => {
                    const nomeCat = linhaTal[index].querySelector('.nomeCateg').textContent;
                    const descCat = linhaTal[index].querySelector('.descCateg').textContent;

                    idUpdate = btn.dataset.id;

                    buscaNomeCategoria.value = nomeCat;
                    buscaDescCategoria.value = descCat;

                    btn_salvarCateg.style.display = "none";
                    btn_editarCateg.style.display = "block";

                          
                })
            });
            

            btn_editarCateg.addEventListener("click", () => {

                console.log("cliquei no btn de editar")
                console.log("ID:", idUpdate);

                const novaCategoria = fetch(`https://providers-richmond-paris-playstation.trycloudflare.com/categorias/${idUpdate}`, {
                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        nomeCategoria: buscaNomeCategoria.value,
                        descCategoria: buscaDescCategoria.value
                    })
                })

                .then(async response => {
                    console.log("ID enviado:", idUpdate);
                    console.log("Status:", response.status);

                    const resposta = await response.text();
                    console.log("Resposta da API:", resposta);

                    if (response.ok) {
                        console.log('Categoria atualizada com sucesso!');
                        msgSucesso();
                    } else {
                        console.log('Erro ao atualizar a categoria.');
                    }
                })
            })
             
})();


//SALVAR PRODUTOS -------------------------------------------------------------------
btn_salvarProd.addEventListener("click", (event) => {
    event.preventDefault();
    if(!validarCampos(camposProdutos)){
        
        return;
    }

    const nomeProdut = nomeProd.value;
    const categoriaProduto = selecCateg.value;
    const quantidadeProdut = quantidade.value;
    const precoProdut = preco.value.replace(",", ".");
    const descricaoProdut = descProd.value;

    const novoProduto = fetch('https://providers-richmond-paris-playstation.trycloudflare.com/produtos', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            nomeProduto: nomeProdut,
            quantidadeProduto: Number(quantidadeProdut),
            precoProduto: Number(precoProdut),
            descricaoProduto: descricaoProdut,
            categoria: {
                id: Number(categoriaProduto)
            }   
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Produto cadastrado com sucesso!');
            msgSucesso();
        } else {
            console.log('Erro ao cadastrar o produto.');
        }
    })
});

(async function recebeDadosProdutos(){
            const req = await fetch('https://providers-richmond-paris-playstation.trycloudflare.com/produtos/listar')
            const covertendoEmJSON = await req.json();

            //Obtendo categorias para o for de seleção de categoria do produto
            const pullcategorias = await fetch('https://providers-richmond-paris-playstation.trycloudflare.com/categorias/listar')
            const convertPullCategorias = await pullcategorias.json();    
            const opcoesCategoriaDoProduto = document.getElementById('opcoesCatDoProduto');

            for (const exib of covertendoEmJSON) {

                console.log("Produto: " , exib.nomeProduto);

                const container = document.getElementById('tabelaProduto')
                container.innerHTML += `
                    <tr class="linha">
                        <td>${exib.id}</td>
                        <td class="nomeProduto">${exib.nomeProduto}</td>
                        <td class="descProduto">${exib.descricaoProduto}</td>
                        <td class="precoProduto">${exib.precoProduto}</td>
                        <td class="quantidadeProduto">${exib.quantidadeProduto}</td>
                        <td>
                            <button class="btnEditarProd" data-id="${exib.id}" type="button">Editar</button>
                            <button class="btnExcluirProd" data-id="${exib.id}" type="button">Excluir</button>
                        </td>
                    </tr>
                    
                `   
            }

            for (const categoria of convertPullCategorias) {
                    
                    opcoesCategoriaDoProduto.innerHTML += `
                        <option value="${categoria.id}">
                            ${categoria.nomeCategoria}
                        </option>
                    `;
            };



            const btnExcluirProduto = document.querySelectorAll('.btnExcluirProd');
            const btnEditarProduto = document.querySelectorAll('.btnEditarProd');
            const linhaTal = document.querySelectorAll('.linha');


            btnExcluirProduto.forEach((btn , index) => {
                btn.addEventListener('click', () => {

                    const idDeletProd = btn.dataset.id;

                    const deleteProd = fetch(`https://providers-richmond-paris-playstation.trycloudflare.com/produtos/${idDeletProd}`, {
                        method: 'DELETE',

                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })

                    .then(response => {
                        if (response.ok) {
                            console.log('Produto deletado com sucesso!');
                            msgSucesso();
                        } else {
                            console.log('Erro ao deletar o produto.');
                        }});


                    linhaTal[index].remove();
                });
            });



            //btn de edição em desenvolvimento, meio caminho andado
            
            btnEditarProduto.forEach((btn , index) => {
                btn.addEventListener('click', () => {
                    //const nomeProduto = linhaTal[index].getElementById('nomeProd').textContent;
                    //const categoriaProduto = linhaTal[index].getElementById('opcoesCatDoProduto').textContent;
                    const quantidadeProduto = linhaTal[index].getElementById('quantidade').textContent;
                    const precoProduto = linhaTal[index].getElementById('precProd').textContent;
                    const descProduto = linhaTal[index].getElementById('descProd').textContent;

                    const idUpdate = btn.dataset.id;

                    buscaNomeProduto.value = nomeProduto;
                    buscaDescProduto.value = descProduto;
                    buscaQuantidade.value = quantidadeProduto;
                    buscaPreco.value = precoProduto;
                    buscaCategoria.value = categoriaProduto;

                    btn_salvarProd.style.display = "none";
                    btn_editarProd.style.display = "block";

                    btn_editarCateg.addEventListener("click", () => {

                        const novaCategoria = fetch(`https://providers-richmond-paris-playstation.trycloudflare.com/produtos/${idUpdate}`, {
                            method: 'PUT',

                            headers: {
                                'Content-Type': 'application/json'
                            },

                            body: JSON.stringify({
                                
                            })
                        })

                        .then(response => {
                            if (response.ok) {
                                console.log('Produto atualizado com sucesso!');
                                msgSucesso();
                            } else {
                                console.log('Erro ao atualizar a categoria.');
                            }
                        })
                    })   
                               
                })
        
            });
            

})();