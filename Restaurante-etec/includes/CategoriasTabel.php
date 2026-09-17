<?php
/*
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
                <form method='POST'>
                    <input
                        type='hidden'
                        name='idCate'
                        value='{$categoria['idCate']}'
                    >

                    <button type='submit' name='ExcluirCad'>
                        Excluir
                    </button>

                    <button type='submit' name='EditarCad'>
                        Editar
                    </button>
                </form>
            </td>
        </tr>
    ";
}
    */