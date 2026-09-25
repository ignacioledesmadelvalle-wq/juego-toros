import { CONFIG } from './config.js';
import { EscenaJuego } from './scenes/EscenaJuego.js';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'juego',
  width: CONFIG.ancho,
  height: CONFIG.alto,
  backgroundColor: '#6cc25a',
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [EscenaJuego],
});
