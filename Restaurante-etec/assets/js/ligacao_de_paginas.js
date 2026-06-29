//Aqui só pegando o local dos botão
const btnDirCliente = document.getElementById("btnCliente");
const btnDirAdmin = document.getElementById("btnAdmin");

//botando os botão pra funciona
btnDirCliente.addEventListener("click", function(){
    location.href="Restaurante-etec/Cliente/pagInicialCliente.php"
});

btnDirAdmin.addEventListener("click", function(){
    location.href="Restaurante-etec/Admin/pagLoginadm.php"
});