<?php

require_once __DIR__ . "/Conexao.php";

$sql = "SELECT * FROM produtos";
$resultado = mysqli_query($conection, $sql);

while($produto = mysqli_fetch_assoc($resultado)){
    echo "
    <tr>
        <td>{$produto['idPro']}</td>
        <td>{$produto['nome']}</td>
        <td>{$produto['descricao']}</td>
        <td>{$produto['preco']}</td>
        <td>{$produto['idCate']}</td>
        <td>
                <form method='POST'>
                    <input
                        type='hidden'
                        name='idPro'
                        value='{$produto['idPro']}'
                    >

                    <button type='submit' name='ExcluirPro'>
                        Excluir
                    </button>

                    <button type='submit' name='EditarPro'>
                        Editar
                    </button>
                </form>
            </td>
    </tr>
    ";
}
    
?>