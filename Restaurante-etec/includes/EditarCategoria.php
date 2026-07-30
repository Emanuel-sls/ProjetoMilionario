<?php 
require_once __DIR__ . "/../includes/Conexao.php";

$categoriaEditar = null;

if(isset($_GET["EditarCad"])){

    $id = $_GET["idCate"];

    $sql = "SELECT * FROM categorias
            WHERE idCate = '$id'";

    $resultado = mysqli_query($conection,$sql);

    $categoriaEditar = mysqli_fetch_assoc($resultado);

}

?>