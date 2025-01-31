
//variable de alcance global
let numeroSecreto = 0;
let intentos = 0;
let listasNumerosSorteados = [];
let numeroMaximo = 10;


//Funcion generica para asignar texto a cualquier elemento HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function generarNumeroSecreto() {
    //accion de retornar directamente la accion
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log(numeroGenerado);
    console.log(listasNumerosSorteados);
    //si ya sorteamos todos los numeros...
    if (listasNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los numeros posibles');
    }else{
        //si el numero geneerado esta incluido en la lista...
        if(listasNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            listasNumerosSorteados.push(numeroGenerado)
            return numeroGenerado;
        }
    }
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);//forzamos conversion string a un numero Int
    console.log(`El numero secreto es ${numeroSecreto}`)
    if(numeroDeUsuario === numeroSecreto){
        //cuando el usuario acierta
        asignarTextoElemento('p',`Acertaste el numero en ${intentos} ${(intentos=== 1)? 'intento':'intentos'}`);
        //puede reiniciarse el juego
        document.getElementById('reiniciar').removeAttribute('disabled')


    }else{
        //cuando el usuario no acierta...
        if(numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
            
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }

        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja(){
    let valorCaja = document.querySelector('#valorUsuario').value = '';
    
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del numero secreto!');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`);
    //generar el numero aleatorio
    //nueva invocacionde la variable con su funcion.
    numeroSecreto=generarNumeroSecreto();
    //inicializar el numero de iententos
    intentos = 1;
}

function reiniciarJuego(){
    //limpiar la caja
    limpiarCaja();
    //indicar mensaje de inicio de numeros
    //generar el numero aleatorio
    //inicializar el numero de iententos
    condicionesIniciales();
    //deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true')
}


condicionesIniciales();