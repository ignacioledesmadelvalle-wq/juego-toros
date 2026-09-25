import { CONFIG } from './config.js';
import { texturaSegunVista } from './direccion.js';

const ESTADO = {
  DORMIDO: 'dormido',
  ALERTA: 'alerta',
  DESPIERTO: 'despierto',
  CARGANDO: 'cargando',
};

// Toro dormido -> avisa (tiembla + "!") -> se despierta y bufa -> carga hacia el jugador.
export class Toro {
  constructor(scene, x, y, tiempoDormidoInicial = CONFIG.toro.tiempoDormidoBase) {
    this.scene = scene;
    this.xBase = x;
    this.yBase = y;
    this.estado = ESTADO.DORMIDO;
    this.tiempoParaDespertar = tiempoDormidoInicial;
    this.tiempoEnEstado = 0;
    this.tiempoCargando = 0;
    this.proximoPolvo = 0;

    this.sprite = scene.add.sprite(x, y, 'toro-dormido').setScale(CONFIG.toro.escala);
    this.texto = scene.add
      .text(x, y - this.sprite.displayHeight / 2 - 12, 'Zzz', {
        fontFamily: 'sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        stroke: '#2b1d14',
        strokeThickness: 4,
      })
      .setOrigin(0.5);
  }

  get x() {
    return this.sprite.x;
  }

  get y() {
    return this.sprite.y;
  }

  get atacando() {
    return this.estado === ESTADO.DESPIERTO || this.estado === ESTADO.CARGANDO;
  }

  actualizar(delta, jugadorX, jugadorY, jugadorSigiloso) {
    if (this.estado === ESTADO.DORMIDO || this.estado === ESTADO.ALERTA) {
      const cerca = Phaser.Math.Distance.Between(this.xBase, this.yBase, jugadorX, jugadorY) < CONFIG.toro.radioRuido;
      // Cerca y sin botas: se despierta más rápido. Cerca y con botas: no pasa
      // nada (podés quedarte al lado tranquilo). Lejos: el reloj propio sigue
      // corriendo igual, tengas botas o no.
      let factor = 1;
      if (cerca) factor = jugadorSigiloso ? 0 : CONFIG.toro.multiplicadorRuido;
      this.tiempoParaDespertar -= delta * factor;

      if (this.estado === ESTADO.DORMIDO && this.tiempoParaDespertar <= CONFIG.toro.tiempoAviso) {
        this.estado = ESTADO.ALERTA;
        this.tiempoEnEstado = 0;
        this.texto.setText('!');
        this.scene.sound.play('alerta', { volume: 0.5 });
      }

      if (this.estado === ESTADO.ALERTA) {
        this.tiempoEnEstado += delta;
        this.sprite.x = this.xBase + Math.sin(this.tiempoEnEstado * 0.03) * 4;
      }

      if (this.tiempoParaDespertar <= 0) {
        this.estado = ESTADO.DESPIERTO;
        this.tiempoEnEstado = 0;
        this.sprite.setTexture('toro-despierto');
        this.sprite.setPosition(this.xBase, this.yBase);
        this.texto.setVisible(false);
        this.scene.sound.play('mugido', { volume: 0.6 });
      }
      return;
    }

    if (this.estado === ESTADO.DESPIERTO) {
      this.tiempoEnEstado += delta;
      if (this.tiempoEnEstado >= CONFIG.toro.tiempoBufido) {
        this.estado = ESTADO.CARGANDO;
        this.sprite.setTexture('toro-cargando');
        this.scene.sound.play('bufido', { volume: 0.6 });
      }
      return;
    }

    // Cargando: persigue al jugador en línea recta.
    const angulo = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, jugadorX, jugadorY);
    const dx = Math.cos(angulo);
    const dy = Math.sin(angulo);
    this.sprite.x += dx * CONFIG.toro.velocidadCarga * (delta / 1000);
    this.sprite.y += dy * CONFIG.toro.velocidadCarga * (delta / 1000);

    const { textura, espejado } = texturaSegunVista('toro-cargando', dx, dy);
    if (this.sprite.texture.key !== textura) this.sprite.setTexture(textura);
    this.sprite.setFlipX(espejado);

    // Un poco de "vida" mientras galopa: se estira y achica, y deja polvito.
    this.tiempoCargando += delta;
    const rebote = Math.sin(this.tiempoCargando * CONFIG.toro.frecuenciaGalope) * CONFIG.toro.amplitudGalope;
    this.sprite.setScale(CONFIG.toro.escala * (1 + rebote), CONFIG.toro.escala * (1 - rebote));

    this.proximoPolvo -= delta;
    if (this.proximoPolvo <= 0) {
      this.proximoPolvo = CONFIG.toro.intervaloPolvo;
      this.crearPolvo(dx, dy);
    }
  }

  crearPolvo(dx, dy) {
    const x = this.sprite.x - dx * 30 + Phaser.Math.Between(-8, 8);
    const y = this.sprite.y - dy * 30 + Phaser.Math.Between(-6, 6);
    const nube = this.scene.add.circle(x, y, 7, 0xe8d6a8, 0.7);
    this.scene.tweens.add({
      targets: nube,
      scale: 2.4,
      alpha: 0,
      duration: 400,
      onComplete: () => nube.destroy(),
    });
  }

  distanciaA(x, y) {
    return Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, x, y);
  }
}
