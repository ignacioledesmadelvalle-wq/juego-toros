// Botón simple y reutilizable para todas las pantallas (rectángulo + texto).
export function crearBoton(scene, x, y, texto, alApretar, opciones = {}) {
  const ancho = opciones.ancho || 240;
  const alto = opciones.alto || 68;
  const color = opciones.color || 0xffc92e;
  const colorTexto = opciones.colorTexto || '#2b1d14';
  const fontSize = opciones.fontSize || '30px';

  const contenedor = scene.add.container(x, y);
  const fondo = scene.add.rectangle(0, 0, ancho, alto, color).setStrokeStyle(4, 0x2b1d14);
  const etiqueta = scene.add
    .text(0, 0, texto, { fontFamily: 'sans-serif', fontSize, color: colorTexto, fontStyle: 'bold' })
    .setOrigin(0.5);
  contenedor.add([fondo, etiqueta]);
  contenedor.setSize(ancho, alto);

  fondo.setInteractive({ useHandCursor: true });
  fondo.on('pointerover', () => fondo.setFillStyle(0xffe08a));
  fondo.on('pointerout', () => fondo.setFillStyle(color));
  fondo.on('pointerdown', () => contenedor.setScale(0.94));
  fondo.on('pointerup', () => {
    contenedor.setScale(1);
    alApretar();
  });

  return contenedor;
}
