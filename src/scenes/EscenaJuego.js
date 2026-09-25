import { CONFIG } from '../config.js';
import { Joystick } from '../joystick.js';

// Por ahora el personaje es siempre el granjero. Elegir entre granjero y
// granjera se agrega en una etapa más adelante (pantalla de selección).
export class EscenaJuego extends Phaser.Scene {
  constructor() {
    super('EscenaJuego');
  }

  preload() {
    this.load.image('pasto', 'assets/img/pasto.png');
    this.load.image('granjero', 'assets/img/granjero.png');
  }

  create() {
    this.add
      .tileSprite(CONFIG.ancho / 2, CONFIG.alto / 2, CONFIG.ancho, CONFIG.alto, 'pasto')
      .setTileScale(CONFIG.escalaPasto);

    this.jugador = this.physics.add.sprite(CONFIG.ancho / 2, CONFIG.alto / 2, 'granjero');
    this.jugador.setScale(CONFIG.escalaJugador);
    this.jugador.body.setCircle(this.jugador.width * 0.32, this.jugador.width * 0.18, this.jugador.height * 0.22);
    this.jugador.setCollideWorldBounds(true);

    this.cursores = this.input.keyboard.createCursorKeys();
    this.teclasWasd = this.input.keyboard.addKeys('W,A,S,D');

    this.joystick = new Joystick(this);
  }

  update() {
    let dx = 0;
    let dy = 0;

    if (this.joystick.activo) {
      dx = this.joystick.vector.x;
      dy = this.joystick.vector.y;
    } else {
      if (this.cursores.left.isDown || this.teclasWasd.A.isDown) dx -= 1;
      if (this.cursores.right.isDown || this.teclasWasd.D.isDown) dx += 1;
      if (this.cursores.up.isDown || this.teclasWasd.W.isDown) dy -= 1;
      if (this.cursores.down.isDown || this.teclasWasd.S.isDown) dy += 1;

      const largo = Math.sqrt(dx * dx + dy * dy);
      if (largo > 1) {
        dx /= largo;
        dy /= largo;
      }
    }

    this.jugador.setVelocity(dx * CONFIG.velocidadJugador, dy * CONFIG.velocidadJugador);

    // Se inclina hacia el costado al que camina (sin llegar a quedar cabeza abajo
    // cuando va para arriba, ya que el dibujo solo mira hacia la cámara).
    this.jugador.rotation = Phaser.Math.DegToRad(CONFIG.giroMaximoJugador) * dx;
  }
}
