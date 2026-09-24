//função que fiz para ser reutilizada mais de uma vez com cada uma das ancoras de rolagem
function scrollSuave(comandId, destinoId) {
    const comand = document.getElementById(comandId);
    const destino = document.getElementById(destinoId);

    if (!comand || !destino) {
        console.warn(`scrollSuave: elemento não encontrado (${comandId} -> ${destinoId})`);
        return;
    }

    comand.addEventListener("click", () => {
        destino.scrollIntoView({ behavior: "smooth" });
    });
}

//isso aqui é para definir a função para cada lugar ela deve executar o trabalho dela
scrollSuave("toCategorias", "categoria");
scrollSuave("toProdutos", "produto");
scrollSuave("toPedidos", "pedido");
scrollSuave("toMesas", "mesas");
scrollSuave("toRelatorios", "relatorios"); // precisa de id="relatorios" na section


//troca de pagina, para cadastro de funcionarios
const toCadastro = document.getElementById("toCadastro");

toCadastro.addEventListener("click", () => {
    location.href = "pagCadadm.html";
});


//widgets de mensagem de sucesso e erro
// -> precisa existir no HTML: id="mensagemContainer", id="mensagemSucesso",
//    id="mensagemErro" e id="campo_msgVazio"
const mensagemContainer = document.getElementById("mensagemContainer");
const mensagemSucesso = document.getElementById("mensagemSucesso");
const mensagemErro = document.getElementById("mensagemErro");
const campo_msgVazio = document.getElementById("campo_msgVazio");

const btn_sucesso = document.querySelector(".btn-sucesso");
const btn_erro = document.querySelector(".btn-erro");


//funcao mostrar widget de sucesso
function msgSucesso() {
    mensagemContainer.classList.add("ativo");
    mensagemSucesso.style.display = "block";
    mensagemErro.style.display = "none";

    if (btn_sucesso) {
    btn_sucesso.addEventListener("click", () => {
        mensagemContainer.classList.remove("ativo");
    });
}
}

//funcao mostrar widget de erro
function msgErro(mensagem) {
    mensagemContainer.classList.add("ativo");
    mensagemSucesso.style.display = "none";
    mensagemErro.style.display = "block";

    if (mensagem) {
        campo_msgVazio.textContent = mensagem;
    }

    if (btn_erro) {
    btn_erro.addEventListener("click", () => {
        mensagemContainer.classList.remove("ativo");
    });
}
}

// listeners dos botões dos widgets ficam fora das funções,
// senão um novo listener era adicionado a cada clique



//função reutilizavel para verificação de campos
function validarCampos(campos) {
    for (const entrada of campos) {
        if (entrada.input.value.trim() === "") {
            msgErro(entrada.mensagem);
            return false;
        }
        if (entrada.numerico && Number.isNaN(Number(entrada.input.value))) {
            msgErro(entrada.mensagemNumero || `O campo "${entrada.mensagem}" precisa ser um número.`);
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
// -> select da categoria do produto precisa ter id="opcoesCatDoProduto" no HTML
// -> botões precisam ter id="btn3" e id="btn4" no HTML
const nomeProd = document.getElementById("nomeProd");
const selecCateg = document.getElementById("opcoesCatDoProduto");
const quantidade = document.getElementById("quantidade");
const preco = document.getElementById("precProd");
const descProd = document.getElementById("descProd");
const btn_salvarProd = document.getElementById("btn3");
const btn_editarProd = document.getElementById("btn4");
const req_ImagemURL = document.getElementById("imgProd")
btn_editarProd.style.display = "none";


//Mesas
// -> inputs precisam ter id="numMesa" e id="descMesa" no HTML (não "nomeCateg"/"descCateg")
// -> botão de cadastrar precisa ter id="btn5" no HTML
// -> botão de editar precisa ter id="btn6" no HTML (fica escondido até o usuário clicar em "Editar" numa mesa)
const numeroDeMesa = document.getElementById("numMesa");
const descMesa = document.getElementById("descMesa");
const btn_cadastrarMesa = document.getElementById("btn5");
const btn_editarMesa = document.getElementById("btn6");
btn_editarMesa.style.display = "none";

let idUpdateMesa;


//estruturas de dados para validação de campos
const camposCategorias = [
    { input: buscaNomeCategoria, mensagem: "O nome da categoria é obrigatório!" },
    { input: buscaDescCategoria, mensagem: "A descrição da categoria é obrigatória!" }
];

const camposProdutos = [
    { input: nomeProd, mensagem: "O nome do produto é obrigatório!" },
    { input: selecCateg, mensagem: "A categoria do produto é obrigatória!" },
    { input: quantidade, mensagem: "A quantidade do produto é obrigatória!" },
    { input: preco, mensagem: "O preço do produto é obrigatório!" },
    { input: descProd, mensagem: "A descrição do produto é obrigatória!" }
];

const camposMesa = [
    { input: numeroDeMesa, mensagem: "O número da mesa é obrigatório!", numerico: true, mensagemNumero: "O número da mesa precisa ser um número válido!" },
    { input: descMesa, mensagem: "A capacidade da mesa é obrigatória!", numerico: true, mensagemNumero: "A capacidade da mesa precisa ser um número válido!" }
];


const API_BASE = "https://organisation-tricks-boot-usc.trycloudflare.com";


//salvar mesas
btn_cadastrarMesa.addEventListener("click", (event) => {
    event.preventDefault();

    if (!validarCampos(camposMesa)) {
        return;
    }

    const paramsMesa = new URLSearchParams({
        numeroMesa: Number(numeroDeMesa.value),
        capacidade: Number(descMesa.value)
    });

    fetch(`${API_BASE}/mesas?${paramsMesa.toString()}`, {
        method: 'POST'
    })
        .then(async response => {
            if (response.ok) {
                console.log('Mesa cadastrada com sucesso!');
                msgSucesso();
                numeroDeMesa.value = "";
                descMesa.value = "";
                recebeDadosMesas();
            } else {
                const corpoErro = await response.text();
                console.log('Erro ao cadastrar a mesa. Status:', response.status, '| Resposta do servidor:', corpoErro);
                msgErro("Não foi possível cadastrar a mesa.");
            }
        })
        .catch(err => {
            console.error(err);
            msgErro("Erro de conexão com o servidor.");
        });
});


//LISTAR / EDITAR / EXCLUIR MESAS -------------------------------------------------------------------
// -> precisa de um elemento com id="listaMesas" no HTML pra receber os cards de mesa vindos da API
async function recebeDadosMesas() {
    const container = document.getElementById('listaMesas');

    if (!container) {
        console.warn('recebeDadosMesas: não encontrei nenhum elemento com id="listaMesas" no HTML.');
        return;
    }

    const req = await fetch(`${API_BASE}/mesas/listar-mesas`);

    if (!req.ok) {
        const corpoErro = await req.text();
        console.warn('recebeDadosMesas: o servidor respondeu com erro ao listar as mesas. Status:', req.status, '| Resposta:', corpoErro);
        return;
    }

    const mesas = await req.json();

    if (!Array.isArray(mesas)) {
        console.warn('recebeDadosMesas: a resposta da API não é uma lista de mesas:', mesas);
        return;
    }

    container.innerHTML = '';

    for (const mesa of mesas) {
        container.innerHTML += `
            <div class="mesaLivre" data-id="${mesa.idMesa}" data-numero="${mesa.numeroMesa}" data-capacidade="${mesa.capacidade}">
                <h3 class="numMesaTexto">Mesa ${mesa.numeroMesa}</h3>

                <p class="descMesaTexto">Capacidade: ${mesa.capacidade}</p>

                <div class="status">
                    <select name="opcoes">
                        <option value="" disabled selected>Selecione:</option>
                        <option value="opcao1">Livre</option>
                        <option value="opcao2">Reservado</option>
                        <option value="opcao3">Ocupado</option>
                    </select>
                </div>

                <button class="btnEditarMesaItem" data-id="${mesa.idMesa}" type="button">Editar</button>
                <button class="btnExcluirMesaItem" data-id="${mesa.idMesa}" type="button">Excluir</button>
            </div>
        `;
    }

    const cardsMesa = document.querySelectorAll('#listaMesas .mesaLivre');
    const btnEditarMesaItem = document.querySelectorAll('.btnEditarMesaItem');
    const btnExcluirMesaItem = document.querySelectorAll('.btnExcluirMesaItem');

    btnEditarMesaItem.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const card = cardsMesa[index];

            idUpdateMesa = btn.dataset.id;

            numeroDeMesa.value = card.dataset.numero;
            descMesa.value = card.dataset.capacidade;

            btn_cadastrarMesa.style.display = "none";
            btn_editarMesa.style.display = "block";
        });
    });

    btnExcluirMesaItem.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const idDeletMesa = btn.dataset.id;

            fetch(`${API_BASE}/mesas/${idDeletMesa}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Mesa deletada com sucesso!');
                        msgSucesso();
                        cardsMesa[index].remove();
                    } else {
                        console.log('Erro ao deletar a mesa.');
                        msgErro("Não foi possível excluir a mesa.");
                    }
                })
                .catch(err => console.error(err));
        });
    });
}

btn_editarMesa.addEventListener("click", (event) => {
    event.preventDefault();

    if (!validarCampos(camposMesa)) {
        return;
    }

    const paramsEdicaoMesa = new URLSearchParams({
        numeroMesa: Number(numeroDeMesa.value),
        capacidade: Number(descMesa.value)
    });

    fetch(`${API_BASE}/mesas/${idUpdateMesa}?${paramsEdicaoMesa.toString()}`, {
        method: 'PUT'
    })
        .then(async response => {
            if (response.ok) {
                console.log('Mesa atualizada com sucesso!');
                msgSucesso();
                numeroDeMesa.value = "";
                descMesa.value = "";
                btn_cadastrarMesa.style.display = "block";
                btn_editarMesa.style.display = "none";
                recebeDadosMesas();
            } else {
                const corpoErro = await response.text();
                console.log('Erro ao atualizar a mesa. Status:', response.status, '| Resposta do servidor:', corpoErro);
                msgErro("Não foi possível atualizar a mesa.");
            }
        })
        .catch(err => console.error(err));
});

recebeDadosMesas();


//SALVAR CATEGORIAS -------------------------------------------------------------------
btn_salvarCateg.addEventListener("click", (event) => {
    event.preventDefault();

    if (!validarCampos(camposCategorias)) {
        return;
    }

    const nomeCateg = buscaNomeCategoria.value;
    const descCateg = buscaDescCategoria.value;

    fetch(`${API_BASE}/categorias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
                msgErro("Não foi possível cadastrar a categoria.");
            }
        })
        .catch(err => {
            console.error(err);
            msgErro("Erro de conexão com o servidor.");
        });
});

let idUpdate;

(async function recebeDadosCategorias() {
    const req = await fetch(`${API_BASE}/categorias/listar`);
    const covertendoEmJSON = await req.json();

    for (const exib of covertendoEmJSON) {
        const container = document.getElementById('tabelaCategoria');
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
        `;
    }

    const btnExcluirList = document.querySelectorAll('.btnExcluir');
    const btnEditarList = document.querySelectorAll('.btnEditar');
    const linhaTal = document.querySelectorAll('#tabelaCategoria .linha');

    btnExcluirList.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const idDeletCateg = btn.dataset.id;

            fetch(`${API_BASE}/categorias/${idDeletCateg}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Categoria deletada com sucesso!');
                        msgSucesso();
                        linhaTal[index].remove();
                    } else {
                        console.log('Erro ao deletar a categoria.');
                        msgErro("Não foi possível excluir a categoria.");
                    }
                })
                .catch(err => console.error(err));
        });
    });

    btnEditarList.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const nomeCat = linhaTal[index].querySelector('.nomeCateg').textContent;
            const descCat = linhaTal[index].querySelector('.descCateg').textContent;

            idUpdate = btn.dataset.id;

            buscaNomeCategoria.value = nomeCat;
            buscaDescCategoria.value = descCat;

            btn_salvarCateg.style.display = "none";
            btn_editarCateg.style.display = "block";
        });
    });

    btn_editarCateg.addEventListener("click", (event) => {
        event.preventDefault();

        if (!validarCampos(camposCategorias)) {
            return;
        }

        fetch(`${API_BASE}/categorias/${idUpdate}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nomeCategoria: buscaNomeCategoria.value,
                descCategoria: buscaDescCategoria.value
            })
        })
            .then(async response => {
                if (response.ok) {
                    console.log('Categoria atualizada com sucesso!');
                    msgSucesso();
                    btn_salvarCateg.style.display = "block";
                    btn_editarCateg.style.display = "none";
                } else {
                    console.log('Erro ao atualizar a categoria.');
                    msgErro("Não foi possível atualizar a categoria.");
                }
            })
            .catch(err => console.error(err));
    });
})();


//SALVAR PRODUTOS -------------------------------------------------------------------
btn_salvarProd.addEventListener("click", (event) => {
    event.preventDefault();

    if (!validarCampos(camposProdutos)) {
        return;
    }

    const nomeProdut = nomeProd.value;
    const categoriaProduto = selecCateg.value;
    const quantidadeProdut = quantidade.value;
    const precoProdut = preco.value.replace(",", ".");
    const descricaoProdut = descProd.value;
    const imagemDoProduto = req_ImagemURL.value;

    fetch(`${API_BASE}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nomeProduto: nomeProdut,
            quantidadeProduto: Number(quantidadeProdut),
            precoProduto: Number(precoProdut),
            descricaoProduto: descricaoProdut,
            categoria: { id: Number(categoriaProduto) },
            imagemUrlProduto: imagemDoProduto
        })
    })
        .then(response => {
            if (response.ok) {
                console.log('Produto cadastrado com sucesso!');
                msgSucesso();
            } else {
                console.log('Erro ao cadastrar o produto.');
                msgErro("Não foi possível cadastrar o produto.");
            }
        })
        .catch(err => console.error(err));
});

let idUpdateProduto;

(async function recebeDadosProdutos() {
    const container = document.getElementById('tabelaProduto');
    const opcoesCategoriaDoProduto = document.getElementById('opcoesCatDoProduto');

    if (!container) {
        console.warn('recebeDadosProdutos: não encontrei nenhum elemento com id="tabelaProduto" no HTML. Adicione esse id no <tbody> da tabela de produtos.');
        return;
    }

    const req = await fetch(`${API_BASE}/produtos/listar`);
    const covertendoEmJSON = await req.json();

    console.log(covertendoEmJSON)

    //Obtendo categorias para o for de seleção de categoria do produto
    const pullcategorias = await fetch(`${API_BASE}/categorias/listar`);
    const convertPullCategorias = await pullcategorias.json();

    // limpa a tabela antes de preencher, pra não duplicar linhas de exemplo/antigas
    container.innerHTML = '';

    for (const exib of covertendoEmJSON) {
        container.innerHTML += `
            <tr class="linha" data-categoria-id="${exib.categoria ? exib.categoria.id : ''}" data-imagem-url="${exib.imagemUrlProduto || ''}">
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
        `;
    }

    if (opcoesCategoriaDoProduto) {
        opcoesCategoriaDoProduto.innerHTML = '<option value="" disabled selected>Selecione</option>';

        for (const categoria of convertPullCategorias) {
            opcoesCategoriaDoProduto.innerHTML += `
                <option value="${categoria.id}">${categoria.nomeCategoria}</option>
            `;
        }
    }

    const btnExcluirProduto = document.querySelectorAll('.btnExcluirProd');
    const btnEditarProduto = document.querySelectorAll('.btnEditarProd');
    const linhaTal = document.querySelectorAll('#tabelaProduto .linha');

    btnExcluirProduto.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const idDeletProd = btn.dataset.id;

            fetch(`${API_BASE}/produtos/${idDeletProd}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Produto deletado com sucesso!');
                        msgSucesso();
                        linhaTal[index].remove();
                    } else {
                        console.log('Erro ao deletar o produto.');
                        msgErro("Não foi possível excluir o produto.");
                    }
                })
                .catch(err => console.error(err));
        });
    });

    btnEditarProduto.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const linha = linhaTal[index];

            const nomeProduto = linha.querySelector('.nomeProduto').textContent;
            const descProduto = linha.querySelector('.descProduto').textContent;
            const quantidadeProduto = linha.querySelector('.quantidadeProduto').textContent;
            const precoProduto = linha.querySelector('.precoProduto').textContent;
            const categoriaId = linha.dataset.categoriaId;
            const imagemProduto = linha.dataset.imagemUrl;

            idUpdateProduto = btn.dataset.id;

            nomeProd.value = nomeProduto;
            descProd.value = descProduto;
            quantidade.value = quantidadeProduto;
            preco.value = precoProduto;
            selecCateg.value = categoriaId;
            req_ImagemURL.value = imagemProduto || "";

            btn_salvarProd.style.display = "none";
            btn_editarProd.style.display = "block";
        });
    });

    btn_editarProd.addEventListener("click", (event) => {
        event.preventDefault();

        if (!validarCampos(camposProdutos)) {
            return;
        }

        fetch(`${API_BASE}/produtos/${idUpdateProduto}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nomeProduto: nomeProd.value,
                quantidadeProduto: Number(quantidade.value),
                precoProduto: Number(preco.value.replace(",", ".")),
                descricaoProduto: descProd.value,
                categoria: { id: Number(selecCateg.value) },
                imagemUrlProduto: req_ImagemURL.value
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Produto atualizado com sucesso!');
                    msgSucesso();
                    btn_salvarProd.style.display = "block";
                    btn_editarProd.style.display = "none";
                } else {
                    console.log('Erro ao atualizar o produto.');
                    msgErro("Não foi possível atualizar o produto.");
                }
            })
            .catch(err => console.error(err));
    });
})();


//LISTAR / CANCELAR PEDIDOS -------------------------------------------------------------------
// -> precisa de id="tabelaPedidos" e id="tabelaPagamentos" no HTML (nos <tbody>)
function formatarDataHora(dataPedidoISO) {
    const data = new Date(dataPedidoISO);
    return data.toLocaleString("pt-BR", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    });
}

function calcularTotalPedido(pedido) {
    if (!pedido.itens || pedido.itens.length === 0) return 0;

    return pedido.itens.reduce((total, item) => {
        const preco = item.produto ? item.produto.precoProduto : 0;
        return total + (preco * item.quantidade);
    }, 0);
}

async function recebeDadosPedidos() {
    const tabelaPedidos = document.getElementById('tabelaPedidos');
    const tabelaPagamentos = document.getElementById('tabelaPagamentos');

    if (!tabelaPedidos || !tabelaPagamentos) {
        console.warn('recebeDadosPedidos: não encontrei #tabelaPedidos ou #tabelaPagamentos no HTML.');
        return;
    }

    const req = await fetch(`${API_BASE}/pedidos`);

    if (!req.ok) {
        console.warn('recebeDadosPedidos: erro ao listar pedidos. Status:', req.status);
        return;
    }

    const pedidos = await req.json();

    console.log("Pedidos recebidos da API:", pedidos);

    tabelaPedidos.innerHTML = '';
    tabelaPagamentos.innerHTML = '';

    for (const pedido of pedidos) {
        const numeroMesa = pedido.mesa ? pedido.mesa.numeroMesa : '-';
        const dataFormatada = pedido.dataPedido ? formatarDataHora(pedido.dataPedido) : '-';
        const total = calcularTotalPedido(pedido);

        // Tabela de Gerenciamento de Pedidos - mostra TODOS os pedidos
        tabelaPedidos.innerHTML += `
            <tr class="linhaPedido" data-id="${pedido.idPedido}">
                <td>${pedido.idPedido}</td>
                <td>${numeroMesa}</td>
                <td>${dataFormatada}</td>
                <td>${total.toFixed(2).replace(".", ",")}</td>
                <td>
                    <button class="btnCancelarPedido" data-id="${pedido.idPedido}" type="button">Cancelar</button>
                </td>
            </tr>
        `;


        const mesaPediuPagamento = pedido.mesa && pedido.mesa.disponivel === "AGUARDANDO_GARCOM";

        if (mesaPediuPagamento) {
            tabelaPagamentos.innerHTML += `
                <tr>
                    <td>${pedido.idPedido}</td>
                    <td>${numeroMesa}</td>
                    <td>${dataFormatada}</td>
                    <td>${total.toFixed(2).replace(".", ",")}</td>
                </tr>
            `;
        }
    }

    // Botão de cancelar - precisa desse for pra pegar os botões que acabaram de ser criados no HTML
    const botoesCancelar = document.querySelectorAll('.btnCancelarPedido');

    for (const btn of botoesCancelar) {
        btn.addEventListener('click', () => {
            const idPedido = btn.dataset.id;
            const linha = btn.closest('tr');

            fetch(`${API_BASE}/pedidos/deletar/${idPedido}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Pedido cancelado com sucesso!');
                        msgSucesso();
                        linha.remove();
                    } else {
                        console.log('Erro ao cancelar o pedido. Status:', response.status);
                        msgErro("Não foi possível cancelar o pedido.");
                    }
                })
                .catch(err => {
                    console.error(err);
                    msgErro("Erro de conexão com o servidor.");
                });
        });
    }
}

recebeDadosPedidos();


//RELATÓRIOS -------------------------------------------------------------------
async function carregarRelatorios() {
    const res = await fetch(`${API_BASE}/adm/dia`);
    const dados = await res.json();

    console.log("Relatórios recebidos:", dados);

    document.getElementById('totalPedidosHoje').textContent = dados.totalPedidos;
    document.getElementById('faturamentoDia').textContent = `R$ ${dados.faturamentoDoDia.toFixed(2).replace(".", ",")}`;
    document.getElementById('mesasOcupadas').textContent = `${dados.mesasOcupadas}`;
    document.getElementById('produtoMaisVendido').textContent = dados.produtoMaisVendido;
}

carregarRelatorios();