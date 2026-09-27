import { CONFIG } from '../config.js';
import { crearBoton } from '../boton.js';
import { reproducirMusica } from '../musica.js';
import { cargarNivelGuardado, reiniciarProgreso } from '../progreso.js';

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

    this.crearBotonReiniciar();
  }

  // Botón chiquito para volver a empezar desde el nivel 1 (si no, una vez
  // que llegás a un nivel siempre arrancás ahí, sin forma de volver atrás).
  // Pide tocar dos veces para evitar borrar el progreso sin querer.
  crearBotonReiniciar() {
    const { ancho, alto } = CONFIG;
    let confirmando = false;

    const texto = this.add
      .text(ancho / 2, alto * 0.94, `Reiniciar progreso (nivel ${cargarNivelGuardado()})`, {
        fontFamily: 'sans-serif',
        fontSize: '18px',
        color: '#ffffff',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    texto.on('pointerup', () => {
      this.sound.play('click', { volume: 0.5 });
      if (!confirmando) {
        confirmando = true;
        texto.setText('¿Seguro? Tocá de nuevo para volver al nivel 1');
        this.time.delayedCall(3000, () => {
          if (confirmando) {
            confirmando = false;
            texto.setText(`Reiniciar progreso (nivel ${cargarNivelGuardado()})`);
          }
        });
      } else {
        confirmando = false;
        reiniciarProgreso();
        texto.setText('¡Progreso reiniciado!');
        this.time.delayedCall(1500, () => {
          texto.setText(`Reiniciar progreso (nivel ${cargarNivelGuardado()})`);
        });
      }
    });
  }
}
