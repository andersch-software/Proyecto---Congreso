/////////////////////////////////////////////////////////////
///Se imprime dependiendo la hoja de HTML que este Activa///

var htmlAbierto = "house";
if (document.getElementById("house") == null) {
    htmlAbierto = "senate";
}

//////////////////////////////////////
///Función Fetch para llamar Datos///

var data = null;

function datos_tr() {
    fetch("https://api.propublica.org/congress/v1/116/" + htmlAbierto + "/members.json", {
            headers: {
                "X-API-Key": "cXoTamEdUJPPtf8JIluMvmkN1YmidwlDfKWYRNVq"
            },
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            data = json;
            console.log(data);
            console.log('Salio todo bien');
            a.jsonOriginal = data.results[0].members;       
            a.pepito= data.results[0].members;
            misFunciones();
        })
        .catch(function (error) {
            console.log('Tienes una equivocación');
        });
};
datos_tr();

////////////////////
////////Vue////////

var a = new Vue({
    el: '#vue',
    data: {
        jsonOriginal: [],
        pepito : [],
        cantrep: [],
        cantdem: [],
        cantind: [],
        republicano: [],
        democrata: [],
        independiente: [],
        votosrep: [],
        votosdem: [],
        votosind: [],
        votan_menos: [],
        votan_mas: [],
    },
    
});
//////////////////////////////////


//Cantidad total de miembros
//////////////////////////////////
function cantidad_total() {
    var cantsenadores = a.jsonOriginal.length;
    console.log("Total = " + cantsenadores);
}
console.log(cantidad_total);

//Por partido
//////////////////////////////////
function integrantes() {
    //var integrantes = a.jsonOriginal.members
    //En los array coloco la cantidad de congresistas por cada uno
    a.republicano = a.jsonOriginal.filter(integrantes => integrantes.party == "R")
    console.log(a.republicano)
    a.democrata = a.jsonOriginal.filter(integrantes => integrantes.party == "D")
    a.independiente = a.jsonOriginal.filter(integrantes => integrantes.party == "ID")
};

//Llamado de mis funciones
//////////////////////////////////
function misFunciones() {
    //cantidad_total();
    integrantes();
    console.log("integrantes")
    solo_republicanos();
    console.log("solo rep")
    solo_democratas();
    console.log("solo dem")
    solo_independientes();
    console.log("solo ind")
    partido_menor_votos();
    partido_mayor_votos();
}


///////////////////////
//Porcentaje de votos//
/////////////////////// 

function solo_republicanos() {
    console.log("REPUBLICANOS")
    console.log("Rep = " + a.republicano.length);
    var votosrepublicanos = 0;
    a.republicano.forEach(rep => votosrepublicanos += rep.votes_with_party_pct);
    console.log(votosrepublicanos);
    a.votosrep = (votosrepublicanos / a.republicano.length).toFixed(1);
    console.log(a.votosrep + " %");
};
console.log(solo_republicanos);
//solo_republicanos();
//////////////////////////////////

//DEMOCRATAS
function solo_democratas() {
    console.log("DEMOCRATAS")
    console.log("Dem = " + a.democrata.length)
    var votosdemocratas = 0;
    a.democrata.forEach(rep => votosdemocratas += rep.votes_with_party_pct);
    console.log(votosdemocratas);
    a.votosdem = (votosdemocratas / a.democrata.length).toFixed(1);
    console.log(a.votosdem + " %");
};
console.log(solo_democratas);
//solo_democratas();
//////////////////////////////////

//INDEPENDIENTES
function solo_independientes() {
    console.log("INDEPENDIENTES")
    console.log("Ind = " + a.independiente.length)
    var votosindependientes = 0;
    a.independiente.forEach(rep => votosindependientes += rep.votes_with_party_pct);
    console.log(votosindependientes);
    a.votosind = (votosindependientes / a.independiente.length).toFixed(1);
    console.log(a.votosind + " %");
};
console.log(solo_independientes);
//solo_independientes();
//////////////////////////////////


///////////////////////////////////
//Partidos con mas y menos Votos//
/////////////////////////////////

//Menos Votos por Partido
function partido_menor_votos() {
    var resumen = a.jsonOriginal;
    var menor = ((resumen.length) * 10) / 100;
    var menos_votos = (resumen.sort((a, b) => (b.missed_votes_pct - a.missed_votes_pct)))
    a.votan_menos = menos_votos.slice(0, menor);
    console.log(a.votan_menos);
};
console.log(partido_menor_votos);


//Mas Votos por Partido
function partido_mayor_votos() {
    var resumen2 = a.jsonOriginal;
    var mayor = ((resumen2.length) * 10) / 100
    var mas_votos = (resumen2.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct)))
    a.votan_mas = mas_votos.slice(0, mayor);
    console.log(a.votan_mas);
}
console.log(partido_mayor_votos);


