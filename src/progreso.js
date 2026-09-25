import { CONFIG } from './config.js';

const CLAVE_NIVEL = 'gliff-nivel';
const CLAVE_SILENCIADO = 'gliff-silenciado';

export function cargarNivelGuardado() {
  const guardado = parseInt(localStorage.getItem(CLAVE_NIVEL), 10);
  if (!guardado || guardado < 1 || guardado > CONFIG.totalNiveles) return 1;
  return guardado;
}

export function guardarNivel(nivel) {
  localStorage.setItem(CLAVE_NIVEL, String(nivel));
}

export function estaSilenciado() {
  return localStorage.getItem(CLAVE_SILENCIADO) === '1';
}

export function alternarSilencio() {
  const nuevo = !estaSilenciado();
  localStorage.setItem(CLAVE_SILENCIADO, nuevo ? '1' : '0');
  return nuevo;
}
