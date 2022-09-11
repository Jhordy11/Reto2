
const juego=document.querySelector(".juego");
const menu=document.querySelector(".menu");
const agregar = document.querySelector(".flexAgregar");
var letrasDOM = document.querySelector(".letras")
var teclas = document.querySelector(".teclas");
var palabras = ["CAMINAR","SALTAR","ESCRIBIR","MIRAR","SOPLAR","PERRO","GATO","LORO","CAIMAN","CABALLO","PERA","MANZANA","SANDIA","NARANJA","DURAZNO","AMARILLO","VERDE","AZUL","ROJO","BLANCO"]
var palabraAlAzar;
var letrasEncontradas="";
var letrasPermitidas="QWERTYUIOPASDFGHJKLZXCVBNM";
var ganar=false;
var intentos=0;

var listener = function (event){
    let keyValue = event.key.toUpperCase();
    emparejar(keyValue);
}

function funcionalidad(letra){
    if(!letrasPermitidas.includes(letra)){
        return;
    }else{
        if(intentos>10 || ganar){
            return;
        }
        if(!palabraAlAzar.includes(letra) && !document.querySelector(".incorreto").innerHTML.includes(letra)){
            if(intentos<=10){
                generarDibujo();
                agregarLetraIncorrecta(letra);
            }
            if(intentos==10){
                alertar(1);
            }
            return;
        }
        mostrarLetraAcertada(letra);
        finDelJuego();
    }
}

function iniciarJuego() {
    limpiarDibujo(0.5,intentos);
    resetearValores();
    mostrarTeclado();
    escogerPalabraAlAzar();
    generarLetrasDOM();
    document.addEventListener('keydown', listener);
    juego.style.display="block";
    menu.style.display="none";
    agregar.style.display="none";
    
}

function resetearValores() {
    Swal.fire({customClass:{
        container:"popup"
    }});
    let letrasIncorretas = document.querySelector(".incorreto")
    letrasIncorretas.innerHTML ="";
    ganar=false;
    letrasEncontradas="";
    teclas.innerHTML="";
}

function numeroRandom() {
    let random =Math.round(Math.random()*palabras.length);
    if(random == palabras.length){
        return random-1;
    }
    return random
}

function escogerPalabraAlAzar(){
    palabraAlAzar = palabras[numeroRandom()];
}

function generarLetrasDOM(){
    let aux = "";
    for(let i=0; i<palabraAlAzar.length; i++){
        aux += '<li class="letra" ><p id="l'+i+'"></p><div class="lineaLetra"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="4" viewBox="0 0 80 4" fill="none"><rect width="80" height="4" rx="2" fill="#0A3871"/></svg></div></li> ';
    }
    letrasDOM.innerHTML=aux;
}

function generarDibujo(){
    intentos+=1;
    if(intentos<=10){
        let parteN =".parte"+intentos;
        let parteAmostrar = document.querySelector(parteN);
        parteAmostrar.style.animation = "2s ease-in forwards animarParte";
    }
    
}

function limpiarDibujo(tiempo,c){
    for(let i=1; i<=c;i++){
        let parteN =".parte"+i;
        let dibujo = document.querySelector(parteN);
        dibujo.style.animation= tiempo+"s ease-in forwards transparentar";
    }
    intentos=0;
}

function agregarLetraIncorrecta(keyValue){
    let letrasIncorretas = document.querySelector(".incorreto")
    letrasIncorretas.innerHTML += keyValue;
}

function alertar(numeroDeMensaje) {
    if(numeroDeMensaje==1){
        Swal.fire({
            width:"400px",
            height:"150px",
            html: '<div class="alerta"><img src="imagenes/x.png" alt="resultado" class="imagen"> <div class="textAlerta">Lo Siento Perdiste</div><p class="palabraCorrecta">La palabra era: '+palabraAlAzar+'<br>Fin del juego!</p></div>',
            background:"rgba(0, 0, 0,0.7)",
            showConfirmButton: false,
            timer:3000
            });
            return
    }
    if(numeroDeMensaje==2){
        Swal.fire({
        width:"400px",
        height:"150px",
        html: '<div class="alerta"><img src="imagenes/visto.png" alt="resultado" class="imagen"> <div class="textAlerta">Muy Bien Ganaste!<br>Fin del juego!</div></div>',
        background:"rgba(0, 0, 0,0.7)",
        showConfirmButton: false,
        timer:1500
        });
        return;
    }
    if(numeroDeMensaje==3){
        Swal.fire({
            width:"400px",
            height:"150px",
            html: '<div class="alerta"><img src="imagenes/visto.png" alt="resultado" class="imagen"> <div class="textAlerta">Palabra agregada exitosamente!</div></div>',
            background:"rgba(0, 0, 0,0.7)",
            showConfirmButton: false,
            timer:1500
            });
            return;
    }

    if(numeroDeMensaje==4){
        Swal.fire({
            width:"400px",
            height:"150px",
            html: '<div class="alerta"><img src="imagenes/x.png" alt="resultado" class="imagen"> <div class="textAlerta">No es posible guardar en blanco, repeticiones, números o caracteres especiales incluido Ñ .</div></div>',
            background:"rgba(0, 0, 0,0.7)",
            showConfirmButton: false,
            timer:1500
            });
            return;
    }
}

function finDelJuego() {
    if(comprobarTodasLasLetras(letrasEncontradas,palabraAlAzar)){
        ganar=true;
        alertar(2);
    }
}

function comprobarTodasLasLetras(l,palabra){
    for(let i = 0; i <palabra.length;i++){
        if(!l.includes(palabra[i])){
            return false;
        }
    }
    return true;
}

function mostrarLetraAcertada(keyValue) {

    if(!letrasEncontradas.includes(keyValue)){
        letrasEncontradas += keyValue;
    }

    for(let i = 0; i <palabraAlAzar.length;i++){
        if(palabraAlAzar[i] == keyValue){
            let aux = "#l"+i;
            let extracto = document.querySelector(aux);
            extracto.innerHTML = keyValue;
        }
    }
}

function menuPrincipal(){
    document.removeEventListener('keydown', listener);
    limpiarDibujo(0,10);
    juego.style.display="none";
    menu.style.display="flex";
    agregar.style.display="none";
}
    
function agregarPalabra(){
    juego.style.display="none";
    menu.style.display="none";
    agregar.style.display="flex";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function  guardarPalabra(){
    let a = document.querySelector(".palabra2").value;
    a = a.toUpperCase();
    if(a != "" && !palabras.includes(a) && comprobarTodasLasLetras(letrasPermitidas,a)){
        palabras.push(a);
        alertar(3);
        await sleep(1700);
        iniciarJuego();
    }else{
        alertar(4);
    }
    
}

function mostrarTeclado(){
    for(let i = 0; i <letrasPermitidas.length;i++){
            teclas.innerHTML += '<button onclick="pintar(this)" class="tecla" id="tecla'+letrasPermitidas[i]+'">'+letrasPermitidas[i]+'</button>';
    }
}

function pintar(boton) {
    let datoBoton = boton.innerHTML;
    if(intentos<10 && !ganar){
        if(!palabraAlAzar.includes(datoBoton)){
            boton.style.background="#cf1500";
        }else{
            boton.style.background="#8f9044";
        }
        funcionalidad(datoBoton);
    }
}

function emparejar(letra) {
    let boton = document.getElementById("tecla"+letra);
    pintar(boton);
}