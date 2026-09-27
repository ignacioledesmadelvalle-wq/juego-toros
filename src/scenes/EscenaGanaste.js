import { CONFIG } from '../config.js';
import { crearBoton } from '../boton.js';
import { guardarNivel } from '../progreso.js';
import { reproducirMusicaUnaVez } from '../musica.js';

export class EscenaGanaste extends Phaser.Scene {
  constructor() {
    super('EscenaGanaste');
  }

  preload() {
    this.load.audio('ganaste', 'assets/music/ganaste.mp3');
    this.load.audio('click', 'assets/sfx/click.mp3');
  }

  create() {
    guardarNivel(1);

    const { ancho, alto } = CONFIG;

    reproducirMusicaUnaVez(this, 'ganaste', 0.6);

    this.add.rectangle(ancho / 2, alto / 2, ancho, alto, 0x2b1d14, 0.92);
    this.add
      .text(ancho / 2, alto * 0.34, '¡Ganaste!', {
        fontFamily: 'sans-serif',
        fontSize: '64px',
        color: '#ffc92e',
        stroke: '#2b1d14',
        strokeThickness: 10,
      })
      .setOrigin(0.5);
    this.add
      .text(ancho / 2, alto * 0.48, 'Juntaste todas las monedas de los 10 niveles', {
        fontFamily: 'sans-serif',
        fontSize: '26px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    crearBoton(this, ancho / 2, alto * 0.64, 'Volver al inicio', () => {
      this.scene.start('EscenaInicio');
    });
  }
}
