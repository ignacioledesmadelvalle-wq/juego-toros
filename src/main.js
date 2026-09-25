import { CONFIG } from './config.js';
import { EscenaInicio } from './scenes/EscenaInicio.js';
import { EscenaSeleccion } from './scenes/EscenaSeleccion.js';
import { EscenaJuego } from './scenes/EscenaJuego.js';
import { EscenaPausa } from './scenes/EscenaPausa.js';
import { EscenaNivelCompletado } from './scenes/EscenaNivelCompletado.js';
import { EscenaPerdiste } from './scenes/EscenaPerdiste.js';
import { EscenaGanaste } from './scenes/EscenaGanaste.js';

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
  scene: [EscenaInicio, EscenaSeleccion, EscenaJuego, EscenaPausa, EscenaNivelCompletado, EscenaPerdiste, EscenaGanaste],
});
