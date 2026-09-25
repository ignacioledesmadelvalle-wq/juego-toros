import { CONFIG } from './config.js';

// Joystick virtual: un círculo fijo abajo a la izquierda. Se toca y arrastra
// para moverse; al soltar, vuelve al centro y deja de mover al personaje.
export class Joystick {
  constructor(scene) {
    const { radioBase, radioMano, zonaX, zonaYDesdeAbajo } = CONFIG.joystick;

    this.radioBase = radioBase;
    this.centro = { x: zonaX, y: CONFIG.alto - zonaYDesdeAbajo };
    this.vector = { x: 0, y: 0 };
    this.pointerId = null;

    this.base = scene.add
      .circle(this.centro.x, this.centro.y, radioBase, 0xffffff, 0.25)
      .setScrollFactor(0)
      .setDepth(1000)
      .setStrokeStyle(4, 0xffffff, 0.5);

    this.mano = scene.add
      .circle(this.centro.x, this.centro.y, radioMano, 0xffffff, 0.55)
      .setScrollFactor(0)
      .setDepth(1001);

    scene.input.on('pointerdown', this.alTocar, this);
    scene.input.on('pointermove', this.alMover, this);
    scene.input.on('pointerup', this.alSoltar, this);
    scene.input.on('pointerupoutside', this.alSoltar, this);
  }

  alTocar(pointer) {
    const distancia = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.centro.x, this.centro.y);
    if (this.pointerId === null && distancia <= this.radioBase * 1.8) {
      this.pointerId = pointer.id;
      this.actualizarMano(pointer);
    }
  }

  alMover(pointer) {
    if (pointer.id === this.pointerId) {
      this.actualizarMano(pointer);
    }
  }

  alSoltar(pointer) {
    if (pointer.id === this.pointerId) {
      this.pointerId = null;
      this.vector.x = 0;
      this.vector.y = 0;
      this.mano.setPosition(this.centro.x, this.centro.y);
    }
  }

  actualizarMano(pointer) {
    let dx = pointer.x - this.centro.x;
    let dy = pointer.y - this.centro.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);
    if (distancia > this.radioBase) {
      dx = (dx / distancia) * this.radioBase;
      dy = (dy / distancia) * this.radioBase;
    }
    this.mano.setPosition(this.centro.x + dx, this.centro.y + dy);
    this.vector.x = dx / this.radioBase;
    this.vector.y = dy / this.radioBase;
  }

  get activo() {
    return this.pointerId !== null;
  }
}
