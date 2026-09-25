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

export function detenerMusica() {
  if (sonidoActual) sonidoActual.stop();
  sonidoActual = null;
  claveActual = null;
}
