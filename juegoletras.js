window.onload = function () {
    document.getElementById("bvocal").addEventListener("click", EligeVocal);
    document.getElementById("bconsonante").addEventListener("click", EligeConsonante);
    document.getElementById("bbuscar").addEventListener("click",Buscar);
    document.getElementById("reiniciar").addEventListener("click",Reiniciar);

    // Se desactivan los botones por defecto
    document.getElementById("bbuscar").disabled = true;
    document.getElementById("reiniciar").disabled = true;
}

function EligeVocal() {
    let vocales = "AEIOU";
    let vocal = vocales.charAt((Math.floor(Math.random() * 5)));
    EscribreLetra(vocal);
    ActivaBoton();
}

function EligeConsonante() {
    let consonantes = "BCDFGHJKLMNÑPQRSTVWXYZ";
    let consonante = consonantes.charAt((Math.floor(Math.random() * 22)));
    EscribreLetra(consonante);
    ActivaBoton();
}

function ActivaBoton(){
    let texto = document.getElementById("texto").value;
    //console.log("texto: " + texto);
    if(texto.length >= 4){
        document.getElementById("bbuscar").disabled = false;
    }
}

// Escribe una letra en el input si su longitud es menor que 9
function EscribreLetra(letra) {
    let texto = document.getElementById("texto");

    if (texto.value.length < 9) {
        texto.value += letra;
    }
}

// Funcion que comprueba si la primera palabra está dentro de la segunda
function EstaEnPalabra(p1, p2) {
    //document.getElementById("listapalabras").innerHTML = diccionario.sort(function(a, b){return a.length - b.length});
    // Se ordenan las palabras
    p1 = p1.split("").sort();
    p2 = p2.split("").sort();
    //console.log(p1);
    //console.log(p2);
    // Se borran las letras de la segunda palabra que no estén en la primera
    for (let i = 0; i < p2.length; i++) {
        if (!p1.includes(p2[i])) {
            p2.splice(i, 1);
            i--;
        }
    }
    //console.log(p2);
}

function EstaEnPalabra2(p1, p2) {
    p1 = p1.split("");
    p2 = p2.split("");
    //console.log(p1, p2);

    for (let i = 0; i < p1.length; i++) {
        if (p2.includes(p1[i])) {
            let index = p2.indexOf(p1[i]);
            if (index !== -1) {
                p2.splice(index, 1);
                //console.log(p1, p2);
            }
        }
        else{
            //console.log("false");
            return false;
        }
    }
    //console.log("true");
    return true;
}

//funcion quita acentos
function quitarAcentos(cadena){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

function Buscar(){
    let p2 = document.getElementById("texto").value;
    // Recorro el diccionario y comparo la palabra
    diccionario.forEach(element => {
            var p1 = element.toUpperCase();
            p1 = quitarAcentos(p1);
            
            if(EstaEnPalabra2(p1,p2)){
                //console.log(p1);
                EscribePalabra(element);
            }
            
        });
    // Mostramos las palabras
    document.getElementById("listapalabras").style.visibility = "visible";

    //Se activa el botón de reiniciar
    document.getElementById("reiniciar").disabled = false;
    document.getElementById("bbuscar").disabled = true;
    QuitaComas();

    // Se desactivan los botones de las letras
    document.getElementById("bvocal").disabled = true;
    document.getElementById("bconsonante").disabled = true;
}

function EscribePalabra(palabra){
    let parrafo = document.getElementById("p" + palabra.length);
    parrafo.innerHTML += palabra + ", ";
}

function Reiniciar(){
    document.getElementById("bbuscar").disabled = true;
    document.getElementById("reiniciar").disabled = true;
    let texto = document.getElementById("texto").value = "";
    document.getElementById("listapalabras").style.visibility = "hidden";

    // Se activan los botones de las letras
    document.getElementById("bvocal").disabled = false;
    document.getElementById("bconsonante").disabled = false;

    // Se borran todos los span
    let span = document.getElementsByTagName("span");
    for (let i = 0; i < span.length; i++) {
        span[i].innerHTML = "";
    }
}

function QuitaComas(){
    // Se quitan las comas de los span al final
    let span = document.getElementsByTagName("span");
    for (let i = 0; i < span.length; i++) {
        if(span[i].innerHTML.endsWith(", ")){
            span[i].innerHTML = span[i].innerHTML.slice(0,-2);
        }
    }
}