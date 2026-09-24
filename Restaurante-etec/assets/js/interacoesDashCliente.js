//construção de campos de categorias
const API_BASE = "https://organisation-tricks-boot-usc.trycloudflare.com"


//Solicitar pagamento
const btnChamarFuncionario = document.getElementById("btnChamarGarcom");
const telaChamar = document.getElementById("fundoPagamento");

btnChamarFuncionario.addEventListener("click", async () => {

    const idMesa = Number(selectMesa.value);

    if (!idMesa) {
        alert("Selecione a mesa antes de chamar o garçom.");
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/mesas/${idMesa}/chamar-garcom`, {
            method: 'PUT'
        });

        if (!res.ok) {
            console.error("Erro ao solicitar pagamento. Status:", res.status, await res.text());
            alert("Não foi possível avisar o garçom. Tente novamente.");
            return;
        }

        console.log("Solicitação de pagamento enviada com sucesso.");

    } catch (erro) {
        console.error(erro);
        alert("Erro de conexão com o servidor.");
        return;
    }

    telaChamar.classList.add("ativo");

    const valor = document.getElementById("totalDaConta")
    valor.innerHTML = `Valor Total: R$ ${valorTotal.toFixed(2)}`
});


//Btn de voltar ao cardápio
const btnVoltarCardapio = document.getElementById("voltarAoCardapio");

btnVoltarCardapio.addEventListener("click", () => {
    telaChamar.classList.remove("ativo")
});


fetch(`${API_BASE}/categorias/listar`)
.then(resposta => {
    return resposta.json()
})

.then(dados => {
    console.log(dados)
})

//construindo sections de cada categoria  
    
//função para acabar com erros de acentuação 
function normalizarCategoria(nome) {
    return nome
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replaceAll(" ", "-");
}

//função de controle de numeros de produtos
function controlarQuantidade(input) {
    if (Number(input.value) > Number(input.max)) {
        input.value = input.max;     
    }

    if (Number(input.value) < Number(input.min)) {
        input.value = input.min;
    }
}


//função que atualiza os pedidos 
function atualizarPedido(input) {

    const idProduto = Number(input.dataset.id);
    const quantidade = Number(input.value);

    const produtoOriginal = dadosProdutos.find(
        produto => produto.id === idProduto
    );

    const produtoExistente = pedido.find(
        item => item.id === idProduto
    );

    if (produtoExistente) {

        produtoExistente.quantidade = quantidade;

    } else {

        pedido.push({
            id: idProduto,
            quantidade: quantidade,
            produto: produtoOriginal
        });

    }

    exibirPedido();

    //console.log(pedido);
}


let valorTotal = 0;

//função para mostrar todos os produtos na telinha de vizualizar produtos
function exibirPedido() {

    const telaVisulizarPedido = document.getElementById("visualizacaoPedido");
    const contadorDePreco = document.getElementById("contadorPreco");

    telaVisulizarPedido.innerHTML = `
        <h2>Vizualizar Pedido</h2>
        <hr>
    `;

    valorTotal = 0;

    for (const itemPedido of pedido) {

        const subtotal = itemPedido.produto.precoProduto * itemPedido.quantidade;

        valorTotal += subtotal;

        telaVisulizarPedido.innerHTML += `

            <div class="item-produto">

                <div class="info-produto">

                    <h3 class="nome-produto">
                        ${itemPedido.produto.nomeProduto}
                    </h3>

                    <p class="descricao-produto">
                        ${itemPedido.produto.descricaoProduto}
                    </p>

                    <span class="preco-produto">
                        R$ ${itemPedido.produto.precoProduto.toFixed(2).replace(".", ",")}
                    </span>

                    <p>
                        Quantidade: ${itemPedido.quantidade}
                    </p>

                </div>

            </div>
        `;
    }

    contadorDePreco.innerHTML = valorTotal.toFixed(2).replace(".", ",");
}


//array de armazenamento de produtos do pedido
const pedido = [];
let dadosProdutos = [];


//fetch para puxar produtos de cada categoria e montar o html
fetch(`${API_BASE}/produtos/listar`)
.then(resposta =>{
    return resposta.json();
})

.then(dados => {

    dadosProdutos = dados;

    for (const produto of dados) {

        const nomeCategoria = produto.categoria.nomeCategoria;

        const idCategoria = normalizarCategoria(nomeCategoria);

        const containerCategoria = document.querySelector(
            `#${idCategoria}`
        );


        /*
        // teste de quebra de código
        console.log("Categoria do produto:", nomeCategoria);
        console.log("ID procurado:", `#${idCategoria}`);
        console.log("Elemento encontrado:", containerCategoria);
        */


        if (!containerCategoria) {
            console.log(`Categoria "${nomeCategoria}" não encontrada no HTML`);
            continue;
        }

        containerCategoria.innerHTML += `

            <img src="${produto.imagemUrlProduto}" alt="Foto do prato" class="foto-produto">
            <div class="info-produto">

                <h3 class="nome-produto">
                    ${produto.nomeProduto}
                </h3>

                <p class="descricao-produto">
                    <strong>Categoria:</strong> ${produto.categoria.nomeCategoria}
                </p>

                <p class="descricao-produto">
                    <strong>Descrição:</strong> ${produto.descricaoProduto}
                </p>

                <span class="preco-produto">
                    R$ ${produto.precoProduto.toFixed(2)}
                </span>

                <label>Add Pedido:</label>

                <div class="adicionarPedido">
                    <input 
                        placeholder="0"
                        type="number" 
                        class="quantidade"
                        value="0" 
                        min="0" 
                        max="${produto.quantidadeProduto}"
                        data-id="${produto.id}"
                        oninput="controlarQuantidade(this); atualizarPedido(this)"
                    >
                </div>

            </div>
            <hr>
        `;
    }
});


//selcionador de mesa

const selectMesa = document.getElementById("option");
let mesasCarregadas = [];

async function carregarMesas() {
    const res = await fetch(`${API_BASE}/mesas/listar-mesas`);

    if (!res.ok) {
        console.error("Erro ao buscar mesas:", res.status);
        return;
    }

    mesasCarregadas = await res.json();

    if (selectMesa) {
        selectMesa.innerHTML = '<option value="" disabled selected>Selecione a Mesa</option>';

        for (const mesa of mesasCarregadas) {
            selectMesa.innerHTML += `
                <option value="${mesa.idMesa}">Mesa ${mesa.numeroMesa}</option>
            `;
        }
    }
}

carregarMesas();

//Confirmar Pedido 

const btnConfirmar_Pedido = document.getElementById("btnConfirmarPedido")

btnConfirmar_Pedido.addEventListener("click", async () => {

    const idMesa = Number(selectMesa.value);
    const mesaSelecionada = mesasCarregadas.find(mesa => mesa.idMesa === idMesa);
    const itensParaEnviar = pedido.filter(item => item.quantidade > 0);

    if (!mesaSelecionada) {
        alert("Selecione a mesa antes de confirmar o pedido.");
        return;
    }

    if (itensParaEnviar.length === 0) {
        alert("Adicione pelo menos um produto ao pedido.");
        return;
    }

    try {

        const corpoPedido = { mesa: mesaSelecionada };
        console.log("POST 1 enviando:", JSON.stringify(corpoPedido));

        const resPedido = await fetch(`${API_BASE}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(corpoPedido)
        });

        if (!resPedido.ok) {
            console.error("Erro ao criar o pedido. Status:", resPedido.status, await resPedido.text());
            alert("Não foi possível criar o pedido.");
            return;
        }

        const pedidoCriado = await resPedido.json();
        const idPedido = pedidoCriado.idPedido;
        console.log("Pedido criado:", pedidoCriado);

        // POST 2: adiciona cada item no pedido criado
        for (const item of itensParaEnviar) {
            const corpoItem = {
                produto: item.produto,
                quantidade: item.quantidade
            };
            console.log("POST 2 enviando:", JSON.stringify(corpoItem));

            const resItem = await fetch(`${API_BASE}/pedidos/${idPedido}/itens`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(corpoItem)
            });

            if (!resItem.ok) {
                console.error("Erro ao adicionar item", item.id, "Status:", resItem.status, await resItem.text());
                alert("O pedido foi criado, mas houve erro ao adicionar um item.");
                return;
            }
        }

        alert("Pedido confirmado com sucesso!");

    } catch (erro) {
        console.error(erro);
        alert("Erro de conexão com o servidor.");
    }
});