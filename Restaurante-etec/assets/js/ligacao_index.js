//Essa parte aqui pega todo os botões do index.php para fazer a troca de pagina
const btnDirCliente = document.getElementById("btnCliente");
const btnDirAdmin = document.getElementById("btnAdmin");

//Para Inicial cliente
btnDirCliente.addEventListener("click", () =>{
    location.href="Restaurante-etec/Cliente/pagInicialCliente.php"
});

//Para LoginAdmin
btnDirAdmin.addEventListener("click", () =>{
    location.href="Restaurante-etec/Admin/pagLoginadm.php"
});