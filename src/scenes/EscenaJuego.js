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
    this.load.image('casa', 'assets/img/casa.png');
    this.load.image('cueva', 'assets/img/cueva.png');
    this.load.image('moneda', 'assets/img/moneda.png');
  }

  create() {
    const { ancho: anchoMundo, alto: altoMundo } = CONFIG.mundo;

    this.physics.world.setBounds(0, 0, anchoMundo, altoMundo);
    this.cameras.main.setBounds(0, 0, anchoMundo, altoMundo);

    this.add
      .tileSprite(anchoMundo / 2, altoMundo / 2, anchoMundo, altoMundo, 'pasto')
      .setTileScale(CONFIG.escalaPasto);

    const casaX = CONFIG.margenCasaCueva;
    const cuevaX = anchoMundo - CONFIG.margenCasaCueva;
    const centroY = altoMundo / 2;

    this.add.image(cuevaX, centroY, 'cueva').setScale(CONFIG.escalaCueva);
    this.casa = this.add.image(casaX, centroY, 'casa').setScale(CONFIG.escalaCasa);

    // Nivel 1: una sola moneda, dentro de la cueva.
    this.totalMonedas = 1;
    this.monedasRecolectadas = 0;
    this.monedas = [this.add.image(cuevaX, centroY + 40, 'moneda').setScale(CONFIG.escalaMoneda)];

    this.jugador = this.physics.add.sprite(casaX + 120, centroY, 'granjero');
    this.jugador.setScale(CONFIG.escalaJugador);
    // El cuerpo físico solo se usa para no salirse del mapa; recoger la moneda
    // y volver a casa se controla por distancia (más simple y sin sorpresas).
    this.jugador.body.setCircle(this.jugador.width * 0.3);
    this.jugador.setCollideWorldBounds(true);

    this.cameras.main.startFollow(this.jugador, true, 0.08, 0.08);

    this.textoMonedas = this.add
      .text(16, 16, '', { fontFamily: 'sans-serif', fontSize: '28px', color: '#ffffff', stroke: '#000000', strokeThickness: 4 })
      .setScrollFactor(0)
      .setDepth(1000);
    this.actualizarHUD();

    this.textoNivelCompletado = this.add
      .text(CONFIG.ancho / 2, CONFIG.alto / 2, '¡Nivel completado!', {
        fontFamily: 'sans-serif',
        fontSize: '56px',
        color: '#ffffff',
        stroke: '#2b1d14',
        strokeThickness: 8,
      })
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setDepth(1000)
      .setVisible(false);

    this.nivelCompletado = false;

    this.cursores = this.input.keyboard.createCursorKeys();
    this.teclasWasd = this.input.keyboard.addKeys('W,A,S,D');

    this.joystick = new Joystick(this);
  }

  actualizarHUD() {
    this.textoMonedas.setText(`Monedas: ${this.monedasRecolectadas} / ${this.totalMonedas}`);
  }

  revisarMonedas() {
    for (const moneda of this.monedas) {
      if (moneda.active && Phaser.Math.Distance.Between(this.jugador.x, this.jugador.y, moneda.x, moneda.y) < CONFIG.distanciaRecogerMoneda) {
        moneda.destroy();
        this.monedasRecolectadas += 1;
        this.actualizarHUD();
      }
    }
  }

  revisarLlegadaACasa() {
    if (this.nivelCompletado || this.monedasRecolectadas < this.totalMonedas) return;
    if (Phaser.Math.Distance.Between(this.jugador.x, this.jugador.y, this.casa.x, this.casa.y) < CONFIG.distanciaLlegadaCasa) {
      this.nivelCompletado = true;
      this.textoNivelCompletado.setVisible(true);
    }
  }

  update() {
    if (this.nivelCompletado) {
      this.jugador.setVelocity(0, 0);
      return;
    }

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

    this.revisarMonedas();
    this.revisarLlegadaACasa();
  }
}
