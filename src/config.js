// Todos los números del juego para poder ajustarlos fácil.
export const CONFIG = {
  ancho: 1280,
  alto: 720,

  velocidadJugador: 260,
  incrementoVelocidadPorNivel: 6, // el granjero corre un poco más rápido en cada nivel
  incrementoVelocidadMaximo: 60,
  escalaJugador: 0.22, // los dibujos vienen en 512x512, esto los deja de buen tamaño

  escalaPasto: 0.5, // tamaño del mosaico de pasto (512x512 -> 256x256 en pantalla)

  totalNiveles: 10,
  demoraCambioPantalla: 700, // ms de pausa antes de pasar a la pantalla de nivel completado/perdiste

  mundo: {
    anchoBase: 2600, // ancho del mapa en el nivel 1
    incrementoPorNivel: 220, // cuánto más ancho es el mapa por cada nivel (más lugar para esquivar)
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
    nivelesPorBota: 3, // cada 3 niveles aparece un par más de botas en el campo
  },

  toro: {
    escala: 0.45,
    tiempoDormidoBase: 14000, // ms hasta que se despierta solo (nivel 1)
    reduccionPorNivel: 500, // ms menos por cada nivel (se despiertan más rápido)
    tiempoDormidoMinimo: 6500,
    tiempoAviso: 1500, // ms mostrando "!" y temblando antes de despertarse del todo
    tiempoBufido: 500, // pausa parado (bufando) antes de cargar
    velocidadCarga: 210,
    radioRuido: 160, // si el jugador está más cerca que esto, se despierta más rápido
    multiplicadorRuido: 5,
    radioAtrapar: 55, // distancia para considerar que el toro te tocó
    amplitudGalope: 0.12, // cuánto se achica/estira al galopar
    frecuenciaGalope: 0.02, // qué tan rápido rebota al galopar
    intervaloPolvo: 90, // ms entre nubecitas de polvo mientras carga
  },

  joystick: {
    radioBase: 60,
    radioMano: 30,
    zonaX: 140, // dónde aparece el centro del joystick al tocar (desde la izquierda)
    zonaYDesdeAbajo: 140,
  },
};
