import { CONFIG } from '../config.js';
import { crearBoton } from '../boton.js';

export class EscenaPausa extends Phaser.Scene {
  constructor() {
    super('EscenaPausa');
  }

  preload() {
    this.load.audio('click', 'assets/sfx/click.mp3');
  }

  create() {
    const { ancho, alto } = CONFIG;

    this.add.rectangle(ancho / 2, alto / 2, ancho, alto, 0x000000, 0.55);
    this.add
      .text(ancho / 2, alto * 0.34, 'Pausa', {
        fontFamily: 'sans-serif',
        fontSize: '52px',
        color: '#ffffff',
        stroke: '#2b1d14',
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    crearBoton(this, ancho / 2, alto * 0.52, 'Continuar', () => {
      this.sound.resumeAll();
      this.scene.stop();
      this.scene.resume('EscenaJuego');
    });

    crearBoton(this, ancho / 2, alto * 0.66, 'Volver al inicio', () => {
      this.sound.resumeAll();
      this.scene.stop('EscenaJuego');
      this.scene.stop();
      this.scene.start('EscenaInicio');
    });
  }
}
