let indiceActual = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let intervalo; // Guardaremos el temporizador aquí

function moverSlide(direccion) {
  indiceActual += direccion;

  if (indiceActual >= totalSlides) {
    indiceActual = 0;
  } else if (indiceActual < 0) {
    indiceActual = totalSlides - 1;
  }

  const slider = document.querySelector('.slider');
  slider.style.transform = `translateX(-${indiceActual * 100}%)`;
}

// Función para iniciar el movimiento automático
function iniciarAutoPlay() {
  intervalo = setInterval(() => {
    moverSlide(1); // Mueve una imagen hacia adelante
  }, 3000); // 3000 milisegundos = 3 segundos
}

// Función para cuando el usuario hace clic en los botones
function moverManual(direccion) {
  moverSlide(direccion);
  clearInterval(intervalo); // Detenemos el temporizador actual
  iniciarAutoPlay(); // Lo volvemos a iniciar para que no se crucen los tiempos
}

// Arrancamos el carrusel automático al cargar la página
iniciarAutoPlay();