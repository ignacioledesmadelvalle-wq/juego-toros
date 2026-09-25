import { CONFIG } from '../config.js';
import { crearBoton } from '../boton.js';
import { reproducirMusica } from '../musica.js';

export class EscenaInicio extends Phaser.Scene {
  constructor() {
    super('EscenaInicio');
  }

  preload() {
    this.load.image('fondo-inicio', 'assets/img/fondo-inicio.png');
    this.load.image('logo', 'assets/img/logo.png');
    this.load.audio('menu', 'assets/music/menu.mp3');
    this.load.audio('click', 'assets/sfx/click.mp3');
  }

  create() {
    const { ancho, alto } = CONFIG;

    reproducirMusica(this, 'menu');

    this.add.image(ancho / 2, alto / 2, 'fondo-inicio').setDisplaySize(ancho, alto);

    const logo = this.add.image(ancho / 2, alto * 0.32, 'logo');
    logo.setScale(Math.min((ancho * 0.65) / logo.width, 1));

    crearBoton(this, ancho / 2, alto * 0.72, 'Jugar', () => this.scene.start('EscenaSeleccion'), {
      ancho: 260,
      alto: 78,
      fontSize: '36px',
    });
  }
}
