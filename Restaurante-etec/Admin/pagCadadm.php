<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/cadAdm.css">
    <title>Sabor Vivo</title>
    <link rel="icon" type="image/png" sizes="32x32" href="img/favicon192px.png">
</head>
<body>
    <div class="painel">
        <!-- Cabeçalho: Título e Subtítulo da Tela Inicial -->
        <header>
            <p class="cadastro">Cadastro</p>
            <p class="acesso-adm">Acesso Administrativo</p>
            <hr class="linhaA">
            <h1 class="titulo">Sabor Vivo</h1>
        </header>

        <!-- Tela principal: Botões um para cliente e outro adm -->
        <main>
          <form class="formulario">
                <input id="nomeComp" type="text" placeholder="Nome Completo: ">

                <input id="cpf" type="text" name="cpf" inputmode="numeric" maxlength="14" placeholder="CPF: ">

                <input id="email" type="email" placeholder="E-mail: ">

                <input id="senha" type="password" placeholder="Senha: ">
                <button id="cadastrar" class="button" type="button">CADASTRAR</button>
          </form>
        </main><br>


        <!-- Rodapé:Info. da Tela Inicial -->
        <footer>
            
        </footer>

        <script src="/PROJETOMILIONARIO/Restaurante-etec/assets/js/cadastro_admin.js"></script>
</body>
</html>