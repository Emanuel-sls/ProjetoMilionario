<?php 
require_once __DIR__ . "/../includes/Conexao.php";

function loginAdmin($conection){
    if(isset($_POST["BtnLogar"])){
        $email = $_POST["Email"];
        $senha = $_POST["Senha"];
        $sql = "SELECT * FROM  adm 
        WHERE email = '$email' and senha = '$senha'";

        $resultado = mysqli_query($conection,$sql); 

        if(mysqli_num_rows($resultado)>0){
            header("Location: Dashboard Admin.php");
            exit();
        }
        else{
            echo "Email ou Senha Invalidos";
        }
    }

}

loginAdmin($conection);

?>