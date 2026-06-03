const ref = db.ref("clientes")


let idcapturado = null;
$("#cancelar").hide();

//Função salvar
$("#salvar").click(function (){
    let nome = $("#nome").val().toUpperCase();
    let email = $("#email").val().toLowerCase();

    if(nome === "" || email === ""){
        alert('Preencha todos os campos');
        return
    }

    if (idcapturado) {//Editar
        ref.child(idcapturado).update({nome, email});
        idcapturado = null;
       cancelar();
    } else {//Salvar
        ref.push({ nome, email });    
    }

    

    limpar();
});

//------------------------------------------------//

//Puxando o ID, Nome e E-amil
ref.on("value", dados_tabela => {
    $("#lista").empty();


    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
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
                <td>${reg.email}</td>
                <td>
                    <button class="btn btn-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editar('${id}', '${reg.nome}', '${reg.email}')">
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
    $("#email").val("");
    $("#nome").focus("");
}

//Função Editar
function editar(id, nome, email){
    $("#nome").val(nome);
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
