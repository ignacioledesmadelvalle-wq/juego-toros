import { CONFIG } from '../config.js';
import { crearBoton } from '../boton.js';

export class EscenaInicio extends Phaser.Scene {
  constructor() {
    super('EscenaInicio');
  }

  preload() {
    this.load.image('fondo-inicio', 'assets/img/fondo-inicio.png');
    this.load.image('logo', 'assets/img/logo.png');
  }

  create() {
    const { ancho, alto } = CONFIG;

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
