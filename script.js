// === ADIVINA EL NÚMERO - Versión DOM (personalizada por Ariana) ===

// Pedimos el nombre del jugador al iniciar (si no escribe nada, usamos "jugador")
let jugador = prompt('¿Cómo te llamas?');
if (!jugador) {
  jugador = 'jugador';
}

// --- Seleccionar elementos del HTML ---
const inputIntento = document.getElementById('inputIntento');
const btnAdivinar = document.getElementById('btnAdivinar');
const mensaje = document.getElementById('mensaje');
const contador = document.getElementById('contador');
const mejorPuntajeTexto = document.getElementById('mejorPuntaje');
const historial = document.getElementById('historial');
const btnReiniciar = document.getElementById('btnReiniciar');
const tarjeta = document.getElementById('game-card');

console.log('Elementos conectados:', inputIntento, btnAdivinar, mensaje);

// --- Variables del juego ---
const maxIntentos = 10;            // límite de intentos
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let historialIntentos = [];
let mejorPuntaje = null;           // mejor partida (menos intentos)

console.log('(DEBUG) Número secreto:', numeroSecreto);

// --- Mostrar un mensaje con color ---
function mostrarMensaje(texto, color) {
  mensaje.textContent = texto;
  mensaje.style.color = color;
}

// Mensaje de bienvenida personalizado
mostrarMensaje(`¡Bienvenido/a, ${jugador}! Empieza a adivinar 🌅`, '#ffd166');

// --- Pista de cercanía: recibe el intento y el secreto, devuelve un texto ---
function obtenerPista(intento, secreto) {
  let diferencia = Math.abs(intento - secreto);

  if (diferencia <= 5) {
    return '🔥 ¡Muy cerca!';
  } else if (diferencia <= 15) {
    return '♨️ Caliente';
  } else if (diferencia <= 30) {
    return '🌤️ Tibio';
  } else {
    return '❄️ Frío';
  }
}

// --- Actualizar el mejor puntaje ---
function actualizarMejorPuntaje() {
  if (mejorPuntaje === null || intentos < mejorPuntaje) {
    mejorPuntaje = intentos;
  }
  mejorPuntajeTexto.textContent = 'Mejor puntaje: ' + mejorPuntaje + ' intentos';
}

// --- Cuando el jugador gana ---
function ganar() {
  mostrarMensaje(`🎉 ¡Lo lograste, ${jugador}! Era el ${numeroSecreto}`, '#00ff88');
  btnAdivinar.disabled = true;
  btnReiniciar.style.display = 'inline-block';
  // Celebración visual: la tarjeta brilla verde
  tarjeta.style.borderColor = '#00ff88';
  tarjeta.style.boxShadow = '0 0 40px rgba(0, 255, 136, 0.4)';
  actualizarMejorPuntaje();
}

// --- Game Over: se acabaron los intentos ---
function verificarGameOver() {
  if (intentos >= maxIntentos) {
    mostrarMensaje(`💀 Game Over, ${jugador}. El número era ${numeroSecreto}`, '#ff4757');
    btnAdivinar.disabled = true;
    btnReiniciar.style.display = 'inline-block';
    tarjeta.style.borderColor = '#ff4757';
    tarjeta.style.boxShadow = '0 0 40px rgba(255, 71, 87, 0.4)';
  }
}

// --- Función principal: verifica el intento del jugador ---
function verificarIntento() {
  let valor = Number(inputIntento.value);

  // Validar entrada
  if (isNaN(valor) || valor < 1 || valor > 100) {
    mostrarMensaje(`⚠️ ${jugador}, ingresa un número del 1 al 100`, 'orange');
    return;
  }

  // Incrementar contador
  intentos++;
  contador.textContent = 'Intentos: ' + intentos + ' / ' + maxIntentos;

  // Agregar al historial
  historialIntentos.push(valor);
  historial.textContent = 'Historial: ' + historialIntentos.join(', ');

  // Comparar con el número secreto
  if (valor === numeroSecreto) {
    ganar();
    return;
  } else if (valor > numeroSecreto) {
    let pista = obtenerPista(valor, numeroSecreto);
    mostrarMensaje(`📈 Muy alto, ${jugador}. ${pista}`, '#ff6b6b');
  } else {
    let pista = obtenerPista(valor, numeroSecreto);
    mostrarMensaje(`📉 Muy bajo, ${jugador}. ${pista}`, '#4ecdc4');
  }

  // ¿Se acabaron los intentos?
  verificarGameOver();

  // Limpiar input y enfocar
  inputIntento.value = '';
  inputIntento.focus();
}

// --- Reiniciar juego ---
function reiniciarJuego() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  intentos = 0;
  historialIntentos = [];

  contador.textContent = 'Intentos: 0 / ' + maxIntentos;
  historial.textContent = 'Historial: ';
  mostrarMensaje(`🎯 ¡Nuevo juego, ${jugador}! Adivina el número...`, '#ffd166');

  btnAdivinar.disabled = false;
  btnReiniciar.style.display = 'none';
  inputIntento.value = '';
  inputIntento.focus();

  // Resetear celebración visual
  tarjeta.style.borderColor = 'rgba(255, 209, 102, 0.4)';
  tarjeta.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';

  console.log('(DEBUG) Nuevo número secreto:', numeroSecreto);
}

// --- Conectar eventos ---
btnAdivinar.addEventListener('click', verificarIntento);
btnReiniciar.addEventListener('click', reiniciarJuego);

// --- Enter también funciona ---
inputIntento.addEventListener('keypress', function(evento) {
  if (evento.key === 'Enter') {
    verificarIntento();
  }
});
