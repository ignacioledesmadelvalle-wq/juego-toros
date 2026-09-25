import { CONFIG } from '../config.js';
import { cargarNivelGuardado } from '../progreso.js';

export class EscenaSeleccion extends Phaser.Scene {
  constructor() {
    super('EscenaSeleccion');
  }

  preload() {
    this.load.image('granjero', 'assets/img/granjero.png');
    this.load.image('granjera', 'assets/img/granjera.png');
    this.load.image('pasto', 'assets/img/pasto.png');
  }

  create() {
    const { ancho, alto } = CONFIG;

    this.add.tileSprite(ancho / 2, alto / 2, ancho, alto, 'pasto').setTileScale(CONFIG.escalaPasto);

    this.add
      .text(ancho / 2, alto * 0.16, '¿Granjero o granjera?', {
        fontFamily: 'sans-serif',
        fontSize: '42px',
        color: '#ffffff',
        stroke: '#2b1d14',
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    this.crearOpcion(ancho * 0.33, alto * 0.55, 'granjero', 'Granjero');
    this.crearOpcion(ancho * 0.67, alto * 0.55, 'granjera', 'Granjera');
  }

  crearOpcion(x, y, texturaId, etiqueta) {
    const marco = this.add.rectangle(x, y, 260, 260, 0xffffff, 0.18).setStrokeStyle(4, 0xffffff, 0.7);
    this.add.image(x, y - 10, texturaId).setScale(0.45);
    this.add
      .text(x, y + 150, etiqueta, {
        fontFamily: 'sans-serif',
        fontSize: '28px',
        color: '#ffffff',
        stroke: '#2b1d14',
        strokeThickness: 5,
      })
      .setOrigin(0.5);

    marco.setInteractive({ useHandCursor: true });
    marco.on('pointerover', () => marco.setFillStyle(0xffffff, 0.32));
    marco.on('pointerout', () => marco.setFillStyle(0xffffff, 0.18));
    marco.on('pointerup', () => {
      this.scene.start('EscenaJuego', { personaje: texturaId, nivel: cargarNivelGuardado() });
    });
  }
}
