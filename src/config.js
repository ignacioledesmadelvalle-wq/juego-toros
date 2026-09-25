// Todos los números del juego para poder ajustarlos fácil.
export const CONFIG = {
  ancho: 1280,
  alto: 720,

  velocidadJugador: 260,
  escalaJugador: 0.22, // los dibujos vienen en 512x512, esto los deja de buen tamaño
  giroMaximoJugador: 80, // grados que se inclina al ir para el costado

  escalaPasto: 0.5, // tamaño del mosaico de pasto (512x512 -> 256x256 en pantalla)

  mundo: {
    ancho: 2600, // el mapa es más ancho que la pantalla: casa en un extremo, cueva en el otro
    alto: 720,
  },
  margenCasaCueva: 220, // separación desde el borde del mapa
  escalaCasa: 0.5,
  escalaCueva: 0.55,
  escalaMoneda: 0.14,
  distanciaLlegadaCasa: 90,
  distanciaRecogerMoneda: 55,

  joystick: {
    radioBase: 60,
    radioMano: 30,
    zonaX: 140, // dónde aparece el centro del joystick al tocar (desde la izquierda)
    zonaYDesdeAbajo: 140,
  },
};
