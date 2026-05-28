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