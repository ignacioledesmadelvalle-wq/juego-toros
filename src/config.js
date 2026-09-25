// Todos los números del juego para poder ajustarlos fácil.
export const CONFIG = {
  ancho: 1280,
  alto: 720,

  velocidadJugador: 260,
  escalaJugador: 0.22, // los dibujos vienen en 512x512, esto los deja de buen tamaño

  escalaPasto: 0.5, // tamaño del mosaico de pasto (512x512 -> 256x256 en pantalla)

  joystick: {
    radioBase: 60,
    radioMano: 30,
    zonaX: 140, // dónde aparece el centro del joystick al tocar (desde la izquierda)
    zonaYDesdeAbajo: 140,
  },
};
