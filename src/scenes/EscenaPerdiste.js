import { CONFIG } from '../config.js';
import { crearBoton } from '../boton.js';

export class EscenaPerdiste extends Phaser.Scene {
  constructor() {
    super('EscenaPerdiste');
  }

  init(data) {
    this.nivel = data.nivel;
    this.personaje = data.personaje;
  }

  preload() {
    this.load.audio('perdiste', 'assets/music/perdiste.mp3');
    this.load.audio('click', 'assets/sfx/click.mp3');
  }

  create() {
    const { ancho, alto } = CONFIG;

    this.sound.play('perdiste', { volume: 0.6 });

    this.add.rectangle(ancho / 2, alto / 2, ancho, alto, 0x3d1a1a, 0.9);
    this.add
      .text(ancho / 2, alto * 0.32, '¡Te atrapó el toro!', {
        fontFamily: 'sans-serif',
        fontSize: '48px',
        color: '#ffffff',
        stroke: '#7a1010',
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    crearBoton(this, ancho / 2, alto * 0.52, 'Reintentar', () => {
      this.scene.start('EscenaJuego', { nivel: this.nivel, personaje: this.personaje });
    });
    crearBoton(this, ancho / 2, alto * 0.66, 'Volver al inicio', () => {
      this.scene.start('EscenaInicio');
    });
  }
}
