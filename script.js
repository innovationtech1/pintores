/**
 * =============================================================
 *  CALCULADORA DE PRESUPUESTO — PRECIOS REALES EE.UU. (2025)
 *  Fuentes: HomeAdvisor, Angi, Painting & Decorating Contractors
 *           of America (PDCA), Home Depot & Lowe's price lists.
 * =============================================================
 */
function calcularPresupuestoReal() {

  // --- 1. LEER INPUTS ---
  const metros     = parseFloat(document.getElementById('metros').value);
  const area       = document.getElementById('area').value;
  const superficie = document.getElementById('superficie').value;
  const calidad    = document.getElementById('calidad').value;
  const manos      = parseInt(document.getElementById('manos').value);
  const condicion  = document.getElementById('condicion').value;
  const altura     = document.getElementById('altura').value;
  const acabado    = document.getElementById('acabado').value;

  if (!metros || metros <= 0) {
    alert("Por favor, ingresa una cantidad válida de metros cuadrados.");
    return;
  }

  // Convertir m² a ft² (1 m² = 10.764 ft²)
  const sqft = metros * 10.764;

  // ---------------------------------------------------------------
  //  2. MANO DE OBRA (Labor)
  //  Rango promedio EE.UU.: $2.50 – $5.50 / ft²
  //  Fuente: Angi / HomeAdvisor National Average 2025
  // ---------------------------------------------------------------
  let laborBase = (area === 'exterior') ? 3.50 : 2.80; // $/ft²

  // Ajuste por tipo de superficie
  const laborSuperficie = {
    drywall:  0,      // Más fácil, sin ajuste
    concreto: 0.60,   // Requiere relleno de poros, imprimación especial
    estuco:   0.40,   // Textura irregular = más tiempo
    madera:   0.80,   // Lija, sellado de nudos, más manos
  };
  laborBase += laborSuperficie[superficie] || 0;

  // Ajuste por estado de paredes (preparación incluida en labor)
  const laborCondicion = { bueno: 0, regular: 0.45, malo: 1.10 };
  laborBase += laborCondicion[condicion] || 0;

  // Ajuste por altura (andamios, escaleras)
  const laborAltura = { normal: 0, alta: 0.70, 'muy-alta': 1.60 };
  laborBase += laborAltura[altura] || 0;

  // Ajuste por número de manos
  const factorManos = { 1: 0.70, 2: 1.0, 3: 1.35 };
  laborBase *= factorManos[manos] || 1;

  const costoManoObra = sqft * laborBase;

  // ---------------------------------------------------------------
  //  3. MATERIALES — PINTURA
  //  1 galón cubre ~350–400 ft² con 1 mano
  //  Precios por galón (Home Depot / Lowe's, 2025):
  //    Económica (Behr Int. Flat):      $28 – $38
  //    Estándar  (Benjamin Moore):      $50 – $65
  //    Premium   (Sherwin-Williams):    $70 – $90
  // ---------------------------------------------------------------
  const precioPorGalon = { economica: 33, estandar: 57, premium: 80 };
  const galonesPorMano = sqft / 375; // 375 ft² promedio por galón
  const galonesTotal   = galonesPorMano * manos * 1.10; // +10% desperdicio

  // Ajuste de rendimiento por superficie porosa
  const factorSuperficie = { drywall: 1.0, concreto: 1.35, estuco: 1.25, madera: 1.20 };
  const galonesAjustados = galonesTotal * (factorSuperficie[superficie] || 1);

  // Ajuste de precio por acabado (brillante y semi-brillante son más caros)
  const precioAcabado = { mate: 0, satinado: 5, 'semi-brillante': 8, brillante: 12 };
  const precioPinturaFinal = precioPorGalon[calidad] + (precioAcabado[acabado] || 0);

  const costoPintura = galonesAjustados * precioPinturaFinal;

  // ---------------------------------------------------------------
  //  4. MATERIALES — PREPARACIÓN Y ACCESORIOS
  //  Sellador/Primer: ~$25/galón, cubre 300 ft²
  //  Masilla, cinta, rodillos, brochas: ~$0.30/ft²
  // ---------------------------------------------------------------
  let costoPreparacion = sqft * 0.30; // Accesorios base

  if (condicion === 'regular') {
    // Sellador + resane menor
    costoPreparacion += (sqft / 300) * 25 + sqft * 0.15;
  } else if (condicion === 'malo') {
    // Sellador + resane extenso + imprimación
    costoPreparacion += (sqft / 300) * 25 + sqft * 0.50;
  }

  if (superficie === 'concreto' || superficie === 'madera') {
    // Imprimación especializada obligatoria
    costoPreparacion += (sqft / 300) * 30;
  }

  // ---------------------------------------------------------------
  //  5. TOTAL Y RANGO (±15% para dar margen de variación regional)
  // ---------------------------------------------------------------
  const totalEstimado = costoManoObra + costoPintura + costoPreparacion;
  const totalMin = totalEstimado * 0.85;
  const totalMax = totalEstimado * 1.15;

  // ---------------------------------------------------------------
  //  6. MOSTRAR RESULTADO
  // ---------------------------------------------------------------
  const fmt = (n) => '$' + Math.round(n).toLocaleString('en-US');

  document.getElementById('precio-total').innerText         = fmt(totalEstimado);
  document.getElementById('rango-precio').innerText         = `Rango estimado: ${fmt(totalMin)} – ${fmt(totalMax)}`;
  document.getElementById('costo-material').innerText       = fmt(costoPintura);
  document.getElementById('costo-mano-obra').innerText      = fmt(costoManoObra);
  document.getElementById('costo-preparacion').innerText    = fmt(costoPreparacion);
  document.getElementById('galones-estimados').innerText    = Math.ceil(galonesAjustados) + ' gal';

  document.getElementById('resultado-presupuesto').className = 'resultado-visible';
}

// Mantener compatibilidad con el botón antiguo si existiera
function calcularPresupuesto() { calcularPresupuestoReal(); }



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