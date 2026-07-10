
<?php 
require_once __DIR__ . "/../includes/conexao.php";
require_once __DIR__ . "/../includes/Login.php";

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/PROJETOMILIONARIO/restaurante-etec/assets/css/loginAdm.css">
    <link rel="icon" type="image/png" sizes="32x32" href="/PROJETOMILIONARIO/Restaurante-etec/assets/img/favicon192px.png">
    <title>Sabor Vivo</title>
</head>
<body>
    <div class="painel">
        <!-- Cabeçalho: Título e Subtítulo da Tela Inicial -->
        <header>
            <p class="login">Login</p>
            <p class="acesso-adm">Acesso Administrativo</p>
            <hr class="linhaA">
            <h1 class="titulo">Sabor Vivo</h1>
        </header>

        <!-- Tela principal: Botões um para cliente e outro adm -->
        <main>
          <form class="formulario" method="POST">
                <input type="text" id="nome" placeholder="Nome Completo: ">

                <input type="email" id="email" name="Email" placeholder="E-mail: ">

                <input type="password" id="senha" name="Senha" placeholder="Senha: ">
                <button type="submit" class="button" id="btnLog" name="BtnLogar">LOGAR</button>
          </form>
        </main><br>


        <!-- Rodapé:Info. da Tela Inicial -->
        <footer>
        </footer>

        <script src="/PROJETOMILIONARIO/Restaurante-etec/assets/js/validacaologADM.js"></script>
</body>
</html>