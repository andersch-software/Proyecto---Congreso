//Creo mi Array para contener los datos
var estadistica = {
    "republicano": [],
    "democrata": [],
    "independiente": [],
    "votosrep": 0,
    "votosdem": 0,
    "votosind": 0,
    "votan_menos": [],
}


//Devuelve la cantidad total de miembros
function cantidad_total() {
    var cantsenadores = data.results[0].members.length;
    console.log("Total = " + cantsenadores);
}
console.log(cantidad_total);
cantidad_total();
//////////////////////////////////


//Filtro por partido
function integrantes() {
    var integrantes = data.results[0].members
    //En los array coloco la cantidad de congresistas por cada uno
    estadistica.republicano = integrantes.filter(integrantes => integrantes.party == "R")
    estadistica.democrata = integrantes.filter(integrantes => integrantes.party == "D")
    estadistica.independiente = integrantes.filter(integrantes => integrantes.party == "ID")
}
console.log(integrantes);
integrantes();

///////////////////////
//Porcentaje de votos//
/////////////////////// 
//REPUBLICANOS
function solo_republicanos() {
    console.log("REPUBLICANOS")
    console.log("Rep = " + estadistica.republicano.length);
    var votosrepublicanos = 0;
    estadistica.republicano.forEach(rep => votosrepublicanos += rep.votes_with_party_pct);
    console.log(votosrepublicanos);
    estadistica.votosrep = votosrepublicanos / estadistica.republicano.length;
    console.log(estadistica.votosrep + " %");
};
console.log(solo_republicanos);
solo_republicanos();
//////////////////////////////////

//DEMOCRATAS
function solo_democratas() {
    console.log("DEMOCRATAS")
    console.log("Dem = " + estadistica.democrata.length)
    var votosdemocratas = 0;
    estadistica.democrata.forEach(rep => votosdemocratas += rep.votes_with_party_pct);
    console.log(votosdemocratas);
    estadistica.votosdem = votosdemocratas / estadistica.democrata.length;
    console.log(estadistica.votosdem + " %");
};
console.log(solo_democratas);
solo_democratas();
//////////////////////////////////

//INDEPENDIENTES
function solo_independientes() {
    console.log("INDEPENDIENTES")
    console.log("Ind = " + estadistica.independiente.length)
    var votosindependientes = 0;
    estadistica.independiente.forEach(rep => votosindependientes += rep.votes_with_party_pct);
    console.log(votosindependientes);
    estadistica.votosind = votosindependientes / estadistica.independiente.length;
    console.log(estadistica.votosind + " %");
};
console.log(solo_independientes);
solo_independientes();
//////////////////////////////////


//Partidos con menos votos
//////////////////////////
//Menos Votos por Partido
function partido_menor_votos() {
    var resumen = data.results[0].members;
    var menor = ((resumen.length) * 10) / 100;
    //Sort ordena de mayor a menor desde A(Argumento) hasta B(Argumento)
    var menos_votos = (resumen.sort((a, b) => (b.missed_votes_pct - a.missed_votes_pct)))
    estadistica.votan_menos = menos_votos.slice(0, menor);
    console.log("Veamos si sale bien")
    console.log(estadistica.votan_menos);
};
console.log(partido_menor_votos);
partido_menor_votos();
//////////////////////////////////
//Mas Votos por Partido
function partido_mayor_votos() {
    var resumen2 = data.results[0].members;
    var mayor = ((resumen2.length) * 10) / 100
    var mas_votos = (resumen2.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct)))
    estadistica.votan_mas = mas_votos.slice(0, mayor);
    console.log(estadistica.votan_mas);
}
console.log(partido_mayor_votos);
partido_mayor_votos();
//////////////////////////////////

//--1er tabla--
function house_glance_house() {
    if(estadistica.independiente.length != 0){
         var prueba =
        '<tr> <td>' + 'Republican' + '</td><td>' + estadistica.republicano.length + '</td><td>' + estadistica.votosrep + ' %' + '</td></tr>' +
        '<tr><td>' + 'Democrat' + '</td><td>' + estadistica.democrata.length + '</td><td>' + estadistica.votosdem + ' %' + '</td></tr>' +
        '<tr><td>' + 'Independent' + '</td><td>' + estadistica.independiente.length + '</td><td>' + estadistica.votosind + ' %' + '</td></tr>'
        document.getElementById("tabla_p1").innerHTML = prueba    
    }else{
        var prueba =
        '<tr> <td>' + 'Republican' + '</td><td>' + estadistica.republicano.length + '</td><td>' + estadistica.votosrep + ' %' + '</td></tr>' +
        '<tr><td>' + 'Democrat' + '</td><td>' + estadistica.democrata.length + '</td><td>' + estadistica.votosdem + ' %' + '</td></tr>'
        document.getElementById("tabla_p1").innerHTML = prueba  
    }
};
house_glance_house();
//////////////////////////////////

//--2da tabla--
function tabla_Least_Engaged() {
    var i = 0
    for (i = 0; i < estadistica.votan_menos.length; i++) {
        document.getElementById("tabla_p2").innerHTML += '<tr><td>' + estadistica.votan_menos[i].first_name + ' ' + estadistica.votan_menos[i].last_name + '</td><td>' +
            estadistica.votan_menos[i].missed_votes + '</td><td>' + estadistica.votan_menos[i].missed_votes_pct + '</td></tr>'
        i = i++
        console.log('Esta bien');
    }
}
console.log(partido_menor_votos);
tabla_Least_Engaged();
//////////////////////////////////

//--3er Tabla--
function tabla_most_engaged() {
    var i = 0
    for (i = 0; i < estadistica.votan_mas.length; i++) {
        document.getElementById("tabla_p3").innerHTML += '<tr><td>' + estadistica.votan_mas[i].first_name + ' ' + estadistica.votan_mas[i].last_name + '</td><td>' +
            estadistica.votan_mas[i].missed_votes + '</td><td>' + estadistica.votan_mas[i].missed_votes_pct + '</td></tr>'
        i = i++
        console.log('Esta bien');
    }
}
console.log(partido_mayor_votos);
tabla_most_engaged();
//////////////////////////////////