import { CONFIG } from '../config.js';
import { Joystick } from '../joystick.js';
import { Toro } from '../toro.js';

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
    this.load.image('botas-silenciosas', 'assets/img/botas-silenciosas.png');
    this.load.image('toro-dormido', 'assets/img/toro-dormido.png');
    this.load.image('toro-despierto', 'assets/img/toro-despierto.png');
    this.load.image('toro-cargando', 'assets/img/toro-cargando.png');
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

    // Nivel 1: un solo toro durmiendo entre la casa y la cueva.
    const toroX = (casaX + cuevaX) / 2;
    this.toros = [new Toro(this, toroX, centroY - 150)];

    // Botas silenciosas en el campo, antes de llegar al toro.
    this.botas = [this.add.image(casaX + (toroX - casaX) * 0.6, centroY + 120, 'botas-silenciosas').setScale(CONFIG.botas.escala)];
    this.tiempoSigiloRestante = 0;

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

    this.barraSigiloFondo = this.add
      .rectangle(16, 54, 180, 18, 0x000000, 0.4)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(1000)
      .setVisible(false);
    this.barraSigilo = this.add
      .rectangle(18, 56, 176, 14, 0x7fe3ff, 1)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(1001)
      .setVisible(false);

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

    this.textoPerdiste = this.add
      .text(CONFIG.ancho / 2, CONFIG.alto / 2, '¡Te atrapó el toro!', {
        fontFamily: 'sans-serif',
        fontSize: '48px',
        color: '#ffffff',
        stroke: '#7a1010',
        strokeThickness: 8,
      })
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setDepth(1000)
      .setVisible(false);

    this.nivelCompletado = false;
    this.jugadorAtrapado = false;

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

  revisarBotas(delta) {
    for (const bota of this.botas) {
      if (bota.active && Phaser.Math.Distance.Between(this.jugador.x, this.jugador.y, bota.x, bota.y) < CONFIG.botas.distanciaRecoger) {
        bota.destroy();
        this.tiempoSigiloRestante = CONFIG.botas.duracionSigilo;
      }
    }

    if (this.tiempoSigiloRestante > 0) {
      this.tiempoSigiloRestante = Math.max(0, this.tiempoSigiloRestante - delta);
      const proporcion = this.tiempoSigiloRestante / CONFIG.botas.duracionSigilo;
      this.barraSigilo.width = 176 * proporcion;
      this.barraSigiloFondo.setVisible(true);
      this.barraSigilo.setVisible(true);
    } else {
      this.barraSigiloFondo.setVisible(false);
      this.barraSigilo.setVisible(false);
    }
  }

  revisarToros(delta) {
    const sigiloso = this.tiempoSigiloRestante > 0;
    for (const toro of this.toros) {
      toro.actualizar(delta, this.jugador.x, this.jugador.y, sigiloso);
      if (toro.atacando && toro.distanciaA(this.jugador.x, this.jugador.y) < CONFIG.toro.radioAtrapar) {
        this.perderNivel();
      }
    }
  }

  perderNivel() {
    if (this.jugadorAtrapado || this.nivelCompletado) return;
    this.jugadorAtrapado = true;
    this.jugador.setVelocity(0, 0);
    this.textoPerdiste.setVisible(true);
    this.time.delayedCall(2000, () => this.scene.restart());
  }

  update(time, delta) {
    if (this.nivelCompletado || this.jugadorAtrapado) {
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
    this.revisarBotas(delta);
    this.revisarToros(delta);
  }
}
