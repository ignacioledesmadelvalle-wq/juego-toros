import { CONFIG } from './config.js';

const ESTADO = {
  DORMIDO: 'dormido',
  ALERTA: 'alerta',
  DESPIERTO: 'despierto',
  CARGANDO: 'cargando',
};

// Toro dormido -> avisa (tiembla + "!") -> se despierta y bufa -> carga hacia el jugador.
export class Toro {
  constructor(scene, x, y) {
    this.xBase = x;
    this.yBase = y;
    this.estado = ESTADO.DORMIDO;
    this.tiempoParaDespertar = CONFIG.toro.tiempoDormidoBase;
    this.tiempoEnEstado = 0;

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

  actualizar(delta, jugadorX, jugadorY) {
    if (this.estado === ESTADO.DORMIDO || this.estado === ESTADO.ALERTA) {
      const cerca = Phaser.Math.Distance.Between(this.xBase, this.yBase, jugadorX, jugadorY) < CONFIG.toro.radioRuido;
      this.tiempoParaDespertar -= delta * (cerca ? CONFIG.toro.multiplicadorRuido : 1);

      if (this.estado === ESTADO.DORMIDO && this.tiempoParaDespertar <= CONFIG.toro.tiempoAviso) {
        this.estado = ESTADO.ALERTA;
        this.tiempoEnEstado = 0;
        this.texto.setText('!');
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
      }
      return;
    }

    if (this.estado === ESTADO.DESPIERTO) {
      this.tiempoEnEstado += delta;
      if (this.tiempoEnEstado >= CONFIG.toro.tiempoBufido) {
        this.estado = ESTADO.CARGANDO;
        this.sprite.setTexture('toro-cargando');
      }
      return;
    }

    // Cargando: persigue al jugador en línea recta.
    const angulo = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, jugadorX, jugadorY);
    this.sprite.x += Math.cos(angulo) * CONFIG.toro.velocidadCarga * (delta / 1000);
    this.sprite.y += Math.sin(angulo) * CONFIG.toro.velocidadCarga * (delta / 1000);
    this.sprite.rotation = angulo - Math.PI / 2;
  }

  distanciaA(x, y) {
    return Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, x, y);
  }
}
