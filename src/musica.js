// Se encarga de que solo suene una música de fondo a la vez, aunque
// cambiemos de escena varias veces seguidas.
let sonidoActual = null;
let claveActual = null;

export function reproducirMusica(scene, clave, volumen = 0.5) {
  if (claveActual === clave && sonidoActual && sonidoActual.isPlaying) return;
  detenerMusica();
  sonidoActual = scene.sound.add(clave, { loop: true, volume: volumen });
  sonidoActual.play();
  claveActual = clave;
}

// Para músicas que suenan una sola vez (ganaste, perdiste, nivel completado).
// Se registran igual que la música de fondo para que, si cambiamos de
// escena antes de que termine, se corten en vez de quedar sonando encima
// de la próxima música.
export function reproducirMusicaUnaVez(scene, clave, volumen = 0.5) {
  detenerMusica();
  sonidoActual = scene.sound.add(clave, { loop: false, volume: volumen });
  sonidoActual.play();
  claveActual = clave;
}

export function detenerMusica() {
  if (sonidoActual) sonidoActual.stop();
  sonidoActual = null;
  claveActual = null;
}
