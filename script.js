function calcularPresupuesto() {
  // 1. Obtenemos los valores que ingresó el cliente
  const metros = document.getElementById('metros').value;
  const calidad = document.getElementById('calidad').value;
  const area = document.getElementById('area').value;

  // Validación: Comprobar que el cliente sí puso los metros
  if (metros === "" || metros <= 0) {
    alert("Por favor, ingresa una cantidad válida de metros cuadrados.");
    return;
  }

  // --- TUS PRECIOS ACTUALES (Cámbialos según tu mercado y moneda) ---
  // Precio base por metro cuadrado (Ejemplo: $50 por m2)
  let precioPorMetro = 5; 

  // Si elige pintura Premium, le sumamos $20 al metro cuadrado
  if (calidad === 'premium') {
    precioPorMetro += 20; 
  }

  // Si es Exterior, le sumamos $15 al metro cuadrado por la dificultad/material
  if (area === 'exterior') {
    precioPorMetro += 15; 
  }
  // ------------------------------------------------------------------

  // 2. Calculamos el total (Metros * Precio por metro)
  const totalEstimado = metros * precioPorMetro;

  // 3. Mostramos el resultado en la pantalla
  const elementoResultado = document.getElementById('resultado-presupuesto');
  const elementoPrecio = document.getElementById('precio-total');

  // Le damos formato de moneda (puedes cambiar el símbolo de $ si usas euros u otra moneda)
  elementoPrecio.innerText = "$" + totalEstimado.toLocaleString();
  
  // Hacemos visible la caja del resultado
  elementoResultado.className = 'resultado-visible';
}



//slider

let indiceActual = 0;
let intervaloAutomatico;
const tiempoDeEspera = 3000; // Cambia de imagen cada 3 segundos (3000 ms)

function mostrarSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    
    // Si llegamos al final, volvemos a la primera imagen
    if (n >= slides.length) {
        indiceActual = 0;
    } 
    // Si retrocedemos más allá de la primera, vamos a la última
    else if (n < 0) {
        indiceActual = slides.length - 1;
    } 
    // De lo contrario, actualizamos al índice indicado
    else {
        indiceActual = n;
    }
    
    // Movemos el contenedor usando transform
    const desplazamiento = -(indiceActual * 100);
    slider.style.transform = `translateX(${desplazamiento}%)`;
}

// Función que se llama desde los botones en tu HTML
function moverSlide(n) {
    mostrarSlide(indiceActual + n);
    reiniciarTemporizador(); // Reiniciamos el tiempo si el usuario hace clic
}

function iniciarSliderAutomatico() {
    intervaloAutomatico = setInterval(() => {
        mostrarSlide(indiceActual + 1);
    }, tiempoDeEspera);
}

function reiniciarTemporizador() {
    clearInterval(intervaloAutomatico); // Detenemos el temporizador actual
    iniciarSliderAutomatico(); // Lo volvemos a iniciar desde cero
}

// Inicializar el slider cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarSlide(indiceActual);
    iniciarSliderAutomatico();
});