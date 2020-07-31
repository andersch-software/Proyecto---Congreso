////////////////////////////////////////
////Selecciona en que HTML imprimir////

var pepito = "house";
if(document.getElementById("house") == null){
    pepito = "senate";
}

//////////////////////////////////////////////////////////////////////////////////////////
//////El pedido Fetch me devuelve mi Json dentro de la variable json y jsonOriginal//////

    var data = null ;
    function datos_tr(){
        fetch("https://api.propublica.org/congress/v1/116/" + pepito + "/members.json", {
        headers: { "X-API-Key": "cXoTamEdUJPPtf8JIluMvmkN1YmidwlDfKWYRNVq" },
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            data = json;
            console.log(data);
            a.jsonOriginal = data.results[0].members;
            a.json = data.results[0].members;
        })
        .catch(function (error) {
            console.log('Tienes una equivocación');
        });
    };
    datos_tr();

////////////////////////////////////////////////
//////////////Vue, para ver en HTML////////////

var a = new Vue({
    el : '#tablasVue',
    data : {
        jsonOriginal : [],
        json : [],  
    },
});

////////////////////////////////////////////////
///////////Funciones para filtrar//////////////

function filtrarpartido() {
    //Este booleano verifica que el checkbox este marcado
    var democratamarcado = document.getElementById("democrata").checked;
    var republicanomarcado = document.getElementById("republicano").checked;
    var independientemarcado = document.getElementById("independiente").checked;
    var estado = document.getElementById("estados").value
    a.json = [];
    //////Filtrar estados//////
    
    //////////////////////////////////////
    //////////////Democrata//////////////
    if (democratamarcado) {
        
        for (var i = 0; i < a.jsonOriginal.length; i++) {
            if (a.jsonOriginal[i].party == 'D' &&  a.jsonOriginal[i].state == estado){
                a.json.push(a.jsonOriginal[i]);
            }else if(a.jsonOriginal[i].party == 'D' &&  "ALL" == estado){
                a.json.push(a.jsonOriginal[i]);
            }
        }
    }
    //////////////////////////////////////
    //////////////Republicano/////////////
    if (republicanomarcado) {
        
        for (var i = 0; i < a.jsonOriginal.length; i++) {
            if (a.jsonOriginal[i].party == 'R' &&  a.jsonOriginal[i].state == estado){
                a.json.push(a.jsonOriginal[i]);
            }else if(a.jsonOriginal[i].party == 'R' &&  "ALL" == estado){
                a.json.push(a.jsonOriginal[i]);
            }
        }
    }
    ////////////////////////////////////////
    /////////////Independiente/////////////
    if (independientemarcado) {
        
        for (var i = 0; i < a.jsonOriginal.length; i++) {
            if (a.jsonOriginal[i].party == 'ID' &&  a.jsonOriginal[i].state == estado)  {
                a.json.push(a.jsonOriginal[i]);
            }else if(a.jsonOriginal[i].party == 'ID' &&  "ALL" == estado){
                a.json.push(a.jsonOriginal[i]);
            }
        }
    } 
}


///////////////////////////////////////////////
//////////////EXPERIMETAL//////////////////////

//////////////EXPERIMETAL//////////////////////
///////////////////////////////////////////////