<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sabor Vivor</title>
    </head>
    <body>
        <header>
            <nav>ADM:
                    <a href="#categoria">Categoria</a>
                    <a href="#produto">Produto</a>
                    <a href="#pedido">Pedido</a>
                    <a href="#mesas">Mesas</a>
                    <a href="#relatorios">Relatórios</a>
            </nav>
        </header>

        <div class="banner">
            <img src="adm.png" alt="banner">
        </div>

        <div class="laranjTransp">
            <main>
                <section id="categoria">
                    <h2>Cadastro e Gerenciamento de Categorias</h2>
                    <hr>
                    <form>
                        <label>Nome da Categoria: </label><br>
                        <input id="nomeCateg" type="text" placeholder="Ex: Entradas, Bebidas"><br>

                        <p><label>Descrição: </label><br>
                        <textarea id="descCateg" type="text" placeholder="Ex: Entradas, Bebidas"></textarea></p>

                        <p><button type="button">Salvar Categoria</button></p>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Entradas</td>
                                    <td>Pratos Para Inicial a Refeição</td>
                                    <td><button type="button">Editar</button> <button type="button">Excluir</button></td>
                                </tr>
                            </tbody>

                            <tfoot>
                                <tr>
                                    <td>2</td>
                                    <td>Pratos Principais</td>
                                    <td>Pratos Completos</td>
                                    <td><button type="button">Editar</button> <button type="button">Excluir</button></td>
                                </tr>
                            </tfoot>

                        </table>
                    </form>
                </section>

            </main>

            <main>
            <section id="produto">
                    <h2>Cadastro e Gerenciamento de Produto</h2>
                        <hr>
                        <form>
                            <label>Nome do Produto: </label><br>
                            <input id="nomeProd" type="text" placeholder="Ex: Entradas, Bebidas"><br>

                            <p><label>Categoria: </label>
                            <select id="opcoes" name="opcoes">
                                <option value="" disabled selected>Selecione</option>
                                <option value="opcao1">Entradas</option>
                                <option value="opcao2">Pratos Principais</option>
                                <option value="opcao3">Sobremesas</option>
                            </select></p>

                            <br><label>Preço: </label>
                            <input id="precProd" type="text" placeholder="0,00"><br>

                            <p><label>Descrição: </label><br>
                            <textarea id="descProd" type="text" placeholder="Ingredientes e Descrição dos Produtos"></textarea></p>

                            <label>Imagem: </label><br>
                            <input id="imgProd" type="file" placeholder="Nenhum arquivo escolhido"><br>

                            <p><button type="button">Salvar Produto</button></p>

                            <table> <h3>Lista de Produtos Cadastrados</h3><br>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Preço</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Torrada</td>
                                        <td>Pratos Para Inicial a Refeição</td>
                                        <td>8,00</td>
                                        <td><button type="button">Editar</button> <button type="button">Excluir</button></td>
                                    </tr>
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <td>2</td>
                                        <td>Feijoada</td>
                                        <td>Pratos Completos</td>
                                        <td>28,90</td>
                                        <td><button type="button">Editar</button> <button type="button">Excluir</button></td>
                                    </tr>
                                </tfoot>

                            </table>
                        </form>
                </section>
            </main>
        </div><br>

        <footer></footer>

    </body>
</html>