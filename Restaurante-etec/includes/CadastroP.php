<?php 
require_once __DIR__ . "/../includes/Conexao.php";
require_once __DIR__ . "/../includes/MostrarCategoria.php";

 function cadastrarProd($conection){
    if(isset($_POST["salvarProd"])){
        $nomeProduto = $_POST["nomeProd"];
        $categoria = $_POST["opcoesCat"];
        $preco = $_POST["precoProd"];
        $descricao = $_POST["descProd"];

        $sql = "INSERT INTO produtos
        (nomeProduto,categoria,preco,descricao)
        VALUES('nome','idCate','preco','descricao')";
        mysqli_query($conection, $sql);

        echo "Produto Cadastrado";

    }
    
}

?>