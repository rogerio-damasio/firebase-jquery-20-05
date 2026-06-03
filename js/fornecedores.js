const ref = db.ref("fornecedores");

let idcapturado = null;
$("#cancelar").hide();

$("#salvar").click(function (){
    let nome = $("#nome").val().toUpperCase();
    let cnpj = $("#cnpj").val();
    let estado = $("#estado").val().toUpperCase();
    let email = $("#email").val().toLowerCase();

    if(nome === ""|| cnpj === "" || email === "" || estado === "" ){
        alert('preencha todos os campos');
        return;
    } 
    
  if (idcapturado) {
        ref.child(idcapturado).update({nome, cnpj, email, estado});
        idcapturado = null;
        $("#salvar").text("Salvar");

        $("#cancelar").hide();
        $("#salvar").removeClass("btn-success").addClass("btn-primary");
         $("#status"). text("");
    } else {
         ref.push({nome, cnpj, estado, email});
    }

   
    limpar();

}); 

//------------------------------------------------//
ref.on("value", dados_tabela => {
    $("#lista").empty();


    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Estado</th>
            <th>E-mail</th>
            <th colspan="2">Opções</th>
        </tr>
    `);


    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;

        $("#lista").append(`
            <tr>
                <td>${id}</td>
                <td>${reg.nome}</td>
                <td>${reg.cnpj}</td>
                <td>${reg.estado}</td>
                <td>${reg.email}</td>
                <td>
                    <button class="btn btn-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editar('${id}', '${reg.nome}', '${reg.cnpj}', '${reg.estado}', '${reg.email}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
        `);
    });
});

//------------------------------------------------//

//Função Limpar
function limpar(){
    $("#nome").val("");
    $("#cnpj").val("");
    $("#email").val("");
    $("#estado").val("nada");
    $("#nome").focus();
    
}

//Função Editar
function editar(id, nome, cnpj, estado, email){
    $("#nome").val(nome);
    $("#cnpj").val(cnpj);
    $("#estado").val(estado);
    $("#email").val(email);

    idcapturado = id;

    $("#cancelar").show();

    $("#salvar")
        .text("Atualizar")
        .removeClass("btn-primary")
        .addClass("btn-success");

    $("#status"). text("Editanto registro...");
}

function cancelar() {
    idcapturado = null;
    limpar();
    $("#status").text("");
    $("#salvar")
        .text("Salvar")
        .removeClass("btn-success")
        .addClass("btn-primary");
    $("#cancelar").hide();
}

$("#cancelar").click(function () {
    cancelar();
});
