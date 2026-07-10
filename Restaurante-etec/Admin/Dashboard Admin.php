
<?php
require_once __DIR__ . "/../includes/Conexao.php";
require_once __DIR__ . "/../includes/CadastroCategoria.php";
require_once __DIR__ . "/../includes/CadastroP.php";
require_once __DIR__ . "/../includes/DeleteCategoria.php";
require_once __DIR__ . "/../includes/DeleteProduto.php";

 ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/PROJETOMILIONARIO/Restaurante-etec/assets/css/admstyle.css">
        <link rel="icon" type="image/png" sizes="32x32" href="img/favicon192px.png">
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
                    <a href="#">Cadastrar Funcionário</a>
            </nav>
        </header>

        <div class="banner">
        </div>

        <div class="laranjTransp">
            <main>
                <section id="categoria">
                    <h2>Cadastro e Gerenciamento de Categorias</h2>
                    <hr>
                    <form class="formulario" method="POST">
                        <label>Nome da Categoria: </label><br>
                        <input id="nomeCateg"  name="nomeCateg"  type="text" placeholder="Ex: Entradas, Bebidas"><br>

                        <p><label>Descrição: </label><br>
                        <textarea id="descCateg" name="descCateg" type="text" placeholder="Ex: Entradas, Bebidas"></textarea></p>

                        <p><button type="submit" name="SalvarCat">Salvar Categoria</button></p>

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
                                <?php require_once __DIR__ . "/../includes/CategoriasTabel.php";  ?>  
                            </tbody>

                        </table>
                    </form>
                </section>

            </main>

            <main>
            <section id="produto">
                    <h2>Cadastro e Gerenciamento de Produto</h2>
                        <hr>
                        <form class="formulario" method="POST">
                            <label>Nome do Produto: </label><br>
                            <input id="nomeProd"  name="nomeProd" type="text" placeholder="Ex: Entradas, Bebidas"><br>

                            <p><label>Categoria: </label>
                            <select id="opcoes" name="opcoesCat">
                                <option value="">Selecione uma categoria</option>
                                <?php require_once __DIR__ . "/../includes/MostrarCategoria.php"; ?> 
                            </select></p><br>

                            <label>Estoque: </label>
                            <div class="controle-quantidade">
                            <input type="number" id="quantidade" value="1" min="1" max="1000"></div>

                            <br><label>Preço: </label>
                            <input id="precoProd" name="precoProd" type="text" placeholder="0,00"><br>

                            <p><label>Descrição: </label><br>
                            <textarea id="descProd" name="descProd" type="text" placeholder="Ingredientes e Descrição dos Produtos"></textarea></p>

                            <label>Imagem: </label><br>
                            <input id="imgProd" type="file" placeholder="Nenhum arquivo escolhido"><br>

                            <p><button type="submit" name="salvarProd">Salvar Produto</button></p>

                            <div class="tabela-container">
                                <table> <h3>Lista de Produtos Cadastrados</h3><br>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                            <th>Preço</th>
                                            <th>Categoria</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <?php require_once __DIR__ . "/../includes/ProdutosTabel.php";  ?>  
                                     
                                    </tbody>


                                </table>
                            </div>
                        </form>
                </section>
            </main>
        </div><br>

        <footer></footer>

    </body>
</html>