<?php 
require_once __DIR__ . "/../includes/Conexao.php";


    if(isset($_POST["salvarProd"])){


        $nomeProduto = $_POST["nomeProd"] ?? "";
        $categoria = $_POST["opcoesCat"] ;
        $preco = $_POST["precoProd"] ?? "";
        $descricao = $_POST["descProd"] ?? "";


            if ($categoria == null) {
        die("Selecione uma categoria.");
     }




        $sql = "INSERT INTO produtos
        (nome,idCate,preco,descricao)
        VALUES
        ('$nomeProduto',$categoria,'$preco','$descricao')";

        mysqli_query($conection, $sql);
            echo "Produto cadastrado com sucesso";

}





?>