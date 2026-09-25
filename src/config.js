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

  botas: {
    escala: 0.15,
    duracionSigilo: 8000, // ms que dura el efecto silencioso
    distanciaRecoger: 55,
  },

  toro: {
    escala: 0.45,
    tiempoDormidoBase: 14000, // ms hasta que se despierta solo (nivel 1)
    tiempoAviso: 1500, // ms mostrando "!" y temblando antes de despertarse del todo
    tiempoBufido: 500, // pausa parado (bufando) antes de cargar
    velocidadCarga: 210,
    radioRuido: 160, // si el jugador está más cerca que esto, se despierta más rápido
    multiplicadorRuido: 5,
    radioAtrapar: 55, // distancia para considerar que el toro te tocó
  },

  joystick: {
    radioBase: 60,
    radioMano: 30,
    zonaX: 140, // dónde aparece el centro del joystick al tocar (desde la izquierda)
    zonaYDesdeAbajo: 140,
  },
};
