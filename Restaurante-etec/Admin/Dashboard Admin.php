
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
            <img src="/ProjetoMilionario/Restaurante-etec/assets/img/adm.png" alt="Banner do Restaurante">
            <img src="../assets/img/adm.png" alt="banner">
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

                        <p><button id="btn1" type="submit" name="SalvarCat" id="btnSalvCategoria" >Salvar Categoria</button></p>
                        <p><button id="btn2" type="submit" name="EditarCat">Editar Categoria</button></p>
                        
                        <div class="tabela-container">
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
                        </div>
                    </form>
                </section>

            

            
                    <section id="produto">
                        <h2>Cadastro e Gerenciamento de Produto</h2>
                            <hr>
                            <form>
                                <label>Nome do Produto: </label><br>
                                <input id="nomeProd" type="text" placeholder="Ex: Entradas, Bebidas"><br>

                                <p><label>Categoria: </label>
                                    <select id="opcoes" name="opcoesCat">
                                        <option value="">Selecione uma categoria</option>
                                        <?php require_once __DIR__ . "/../includes/MostrarCategoria.php"; ?> 
                                    </select>
                                </p><br>


                                <label>Estoque: </label>
                                <div class="controle-quantidade">
                                    <input type="number" id="quantidade" value="1" min="1" max="1000">     
                                
                                        
                                </div>

                                <br><label>Preço: </label>
                                <input id="precProd" type="text" placeholder="0,00"><br>

                                <p><label>Descrição: </label><br>
                                <textarea id="descProd" type="text" placeholder="Ingredientes e Descrição dos Produtos"></textarea></p>

                                <label>Imagem: </label><br>
                                <input id="imgProd" type="file" placeholder="Nenhum arquivo escolhido"><br>

                                <p><button id="btn2" type="submit" name="salvarProd">Salvar Produto</button></p>
                                <p><button id="btn2" type="submit" name="salvarProd">Editar Produto</button></p>
                                
                                <div class="tabela-container">
                                    <table> <h3>Lista de Produtos Cadastrados</h3><br>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nome</th>
                                                <th>Descrição</th>
                                                <th>Preço</th>
                                                <th>Estoque</th>
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
            

           
                            <section id="pedido">                           
                                <div class="tabela-container">
                                    <table> <h3>Gerenciamento de Pedidos</h3><br>
                                        <hr>
                                        <thead>
                                            <tr>
                                                <th>N° de Pedidos</th>
                                                <th>Mesa</th>
                                                <th>Data/Hora</th>
                                                <th>Preço</th>
                                                <th>Status</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>05</td>
                                                <td>18/06/2026 11:00</td>
                                                <td>48,00</td>
                                                <td> 
                                                    <select id="opcoes" name="opcoes">
                                                        <option value="" disabled selected>Selecione</option>
                                                        <option value="opcao1">Preparando</option>
                                                        <option value="opcao2">Pendente</option>
                                                        <option value="opcao3">Finalizado</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <button type="button">Cancelar</button>
                                                </td>

                                            </tr>
                                        </tbody>

                                        <tbody>
                                            <tr>
                                                <td>2</td>
                                                <td>08</td>
                                                <td>18/06/2026 13:00</td>
                                                <td>58,90</td>
                                                <td> 
                                                    <select id="opcoes" name="opcoes">
                                                        <option value="" disabled selected>Selecione</option>
                                                        <option value="opcao1">Preparando</option>
                                                        <option value="opcao2">Pendente</option>
                                                        <option value="opcao3">Finalizado</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <button type="button">Cancelar</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                    </section>
         

           
                        <section id="mesas">
                            <h2>Controle de Mesas</h2>
                            <hr>
                            <form>
                                <label>Números de Mesas: </label><br>
                                <input id="nomeCateg" type="text" placeholder="Ex: Entradas, Bebidas"><br>

                                <p><label>Capacidade: </label><br>
                                <textarea id="descCateg" type="text" placeholder="Ex: Entradas, Bebidas"></textarea></p>

                                <p><button type="button">Cadastrar Mesa</button></p>

                                <div class="mesaLivre">
                                    <h3>Mesa1</h3>

                                    <p>Capacidade: 6</p>

                                    <div class="status">
                                    <select id="opcoes" name="opcoes">
                                            <option value="" disabled selected>Selecione:</option>
                                            <option value="opcao1">Livre</option>
                                            <option value="opcao2">Reservado</option>
                                            <option value="opcao3">Ocupado</option>
                                        </select>
                                    </div>
                                </div><br>

                                <div class="mesaLivre">
                                    <h3>Mesa2</h3>

                                    <p>Capacidade: 4</p>

                                    <div class="status">
                                        <select id="opcoes" name="opcoes">
                                            <option value="" disabled selected>Selecione:</option>
                                            <option value="opcao1">Livre</option>
                                            <option value="opcao2">Reservado</option>
                                            <option value="opcao3">Ocupado</option>
                                        </select>
                                        
                                    </div>
                                </div>

                            </form>
                        </section>

            

                        <section id="relatorios" class="relatorios">

                            <h2>Relatórios Básicos</h2>

                            <hr>

                            <div class="cards-relatorios">

                                <div class="card-relatorio">
                                    <p>Total de Pedidos<br>hoje:</p>
                                    <strong>28</strong>
                                </div>

                                <div class="card-relatorio">
                                    <p>Faturamento<br>no dia:</p>
                                    <strong>R$ 1.245,80</strong>
                                </div>

                                <div class="card-relatorio">
                                    <p>Mesas ocupadas:</p>
                                    <strong>6 / 12</strong>
                                </div>

                                <div class="card-relatorio">
                                    <p>Produto mais<br>vendido:</p>
                                    <strong>Feijoada<br>Completa</strong>
                                </div>

                            </div>

                        </section>
                </div><br>
            </main>

        <footer></footer>

        <script src="/PROJETOMILIONARIO/Restaurante-etec/assets/js/interacoesDashAdmin.js"></script>
    </body>
</html>