
//variable de alcance global
let numeroSecreto = 0;
let intentos = 0;
let listasNumerosSorteados = [];
let numeroMaximo = 10;
let imagenInicio = document.getElementById("imgInicio");
let imagenGanador = document.getElementById("imgGanador");

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
        asignarTextoElemento('h1','¡Felicidades! Ganaste')
        asignarTextoElemento('p',`Acertaste el numero en ${intentos} ${(intentos=== 1)? 'intento':'intentos'}`);
        //puede reiniciarse el juego
        document.getElementById('reiniciar').removeAttribute('disabled')
        imagenInicio.classList.add('hidden');  // Agrega la clase 'hidden' para ocultar la imagen
        imagenGanador.classList.remove('hidden');  // Elimina la clase 'hidden' para mostrar la imagen ganadora

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
    imagenGanador.classList.add('hidden'); // Aseguramos que la imagen ganadora esté oculta al inicio
    imagenInicio.classList.remove('hidden'); // Mostramos la imagen de inicio
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