const ref = db.ref("categoria");

let idcapturado = null;
$("#cancelar").hide();

//Função salvar
$("#salvar").click(function (){
    let nome = $("#nome").val().toUpperCase();
    let informacoes = $("#informacoes").val().toLowerCase();

    if(nome === ""|| informacoes === ""){
        alert('preencha todos os campos');
        return
    } 

    if (idcapturado) {
        ref.child(idcapturado).update({nome, informacoes});
        idcapturado = null;
         cancelar();
    } else {
        ref.push({nome, informacoes});
    }
    
    
    limpar();
}); 

//------------------------------------------------//

//Puxando o ID, Nome e Informações
ref.on("value", dados_tabela => {
    $("#lista").empty();


    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Informações</th>
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
                <td>${reg.informacoes}</td>
                <td>
                    <button class="btn btn-danger btn-sm onclick="excluir('${id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editar('${id}', '${reg.nome}', '${reg.informacoes}')">
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
    $("#informacoes").val("");
    $("#nome").focus();
    
}

//Função Editar
function editar(id, nome, informacoes){
    $("#nome").val(nome);
    $("#informacoes").val(informacoes);

    idcapturado = id;

    $("#cancelar").show();

    $("#salvar")
        .text("Atualizar")
        .removeClass("btn-primary")
        .addClass("btn-success");

    $("#status"). text("Editanto registro...");
}

//Função Cancelar
function cancelar(){
    idcapturado = null;
    limpar();
    $("#status").text("");
    $("#salvar")
        .text("Salvar")
        .removeClass("btn-success")
        .addClass("btn-primary")
         $("#cancelar").hide();
}

$("#cancelar").click(function(){
    cancelar();
});

//Função Excluir
function excluir(id){
    if(confirm("Tem certeza que deseja excluir?")){
            db.ref("categoria/" + id).remove();
        }
}
