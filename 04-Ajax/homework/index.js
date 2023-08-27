function friendsHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/amigos",
        success: function (data) {
            let listaAmigos = $("#lista")
            listaAmigos.empty();

            for (let i = 0; i < data.length; i++) {
                let amigo = data[i].name;
                listaAmigos.append(`<li>${amigo}</li>`);
            }
        },
        error: function () {
            console.log("error al obtener la lista de amigos");
        }
    });
}

let searchHandler = function (){
    let id = document.querySelector("input").value;
    let amigo = document.querySelector("#amigo");
    if(id){
        $.get(`http://localhost:5000/amigos/${id}`, (data)=>{
            amigo.innerText = `${data.name}`;
        });
    }else{
        amigo.innerText = "inserta un valor de id valido";
    }
};

let deleteHandler = function (){
    let borrar = document.querySelector("#inputDelete").value;
    let spn = document.querySelector("#success");
    let friend;
    if(borrar){
        $.ajax({
            type: "DELETE",
            url:`http://localhost:5000/amigos/${borrar}`,
            success: ()=>{
                spn.innerText = "amigo eliminado"
                friendsHandler()
            },
        });
    }
};


$("#boton").on("click", friendsHandler);
$('#search').on("click", searchHandler);
$('#delete').on("click", deleteHandler);
