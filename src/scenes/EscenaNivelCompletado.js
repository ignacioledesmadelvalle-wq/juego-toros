import { CONFIG } from '../config.js';
import { crearBoton } from '../boton.js';

export class EscenaNivelCompletado extends Phaser.Scene {
  constructor() {
    super('EscenaNivelCompletado');
  }

  init(data) {
    this.nivel = data.nivel;
    this.personaje = data.personaje;
    this.siguienteNivel = data.siguienteNivel;
  }

  create() {
    const { ancho, alto } = CONFIG;

    this.add.rectangle(ancho / 2, alto / 2, ancho, alto, 0x1f3d1a, 0.9);
    this.add
      .text(ancho / 2, alto * 0.36, '¡Nivel completado!', {
        fontFamily: 'sans-serif',
        fontSize: '52px',
        color: '#ffffff',
        stroke: '#2b1d14',
        strokeThickness: 8,
      })
      .setOrigin(0.5);
    this.add
      .text(ancho / 2, alto * 0.48, `Terminaste el nivel ${this.nivel}`, {
        fontFamily: 'sans-serif',
        fontSize: '26px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    crearBoton(this, ancho / 2, alto * 0.63, 'Siguiente nivel', () => {
      this.scene.start('EscenaJuego', { nivel: this.siguienteNivel, personaje: this.personaje });
    });
  }
}
