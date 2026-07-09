<?php
require_once __DIR__ . "/Conexao.php";

$sql = "SELECT * FROM categorias";
$resultado = mysqli_query($conection, $sql);

while($categoria = mysqli_fetch_assoc($resultado)){
    echo "
    <tr>
        <td>{$categoria['idCate']}</td>
        <td>{$categoria['nome']}</td>
        <td>{$categoria['descicao']}</td>
        <td>
            <button type='button'>Editar</button>
            <button type='button'>Excluir</button>
        </td>
    </tr>
    ";
}
?>