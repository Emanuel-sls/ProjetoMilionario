
<?php
require_once __DIR__ . "/../includes/Conexao.php";


if(isset($_POST["ExcluirPro"]))
{
     $id = $_POST["idPro"];
     $verificar = "SELECT * FROM produtos WHERE idPro = $id";

     $resultado = mysqli_query($conection, $verificar);



    
       if(mysqli_num_rows($resultado) > 0)
    {

        echo "Não é possível excluir essa categoria pois existem produtos cadastrados nela.";

    }

    $sql = "DELETE FROM produtos
    WHERE idPro =  $id";

      mysqli_query($conection, $sql);
      header("Location: Dashboard Admin.php");
    exit();

}

?>