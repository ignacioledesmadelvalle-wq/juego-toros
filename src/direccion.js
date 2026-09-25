// Elige qué dibujo mostrar (de frente, de espaldas o de costado) según hacia
// dónde se mueve el personaje o el toro, y si hay que espejarlo.
export function elegirVista(dx, dy) {
  if (Math.abs(dx) > Math.abs(dy)) {
    return { vista: 'perfil', espejado: dx < 0 };
  }
  return { vista: dy < 0 ? 'espalda' : 'frente', espejado: false };
}

export function texturaSegunVista(base, dx, dy) {
  const { vista, espejado } = elegirVista(dx, dy);
  const textura = vista === 'frente' ? base : `${base}-${vista}`;
  return { textura, espejado };
}
