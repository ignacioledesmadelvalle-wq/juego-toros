# Plan por etapas

Cada etapa termina con algo que se puede probar y un commit.

1. **Base.** `index.html`, Phaser por CDN, campo verde de día y el personaje moviéndose con teclado y joystick táctil.
2. **Casa, cueva y monedas.** Juntar la moneda del nivel 1 y volver a casa para ganar el nivel.
3. **Toros.** Toros durmiendo con "Zzz", aviso antes de despertarse, carga hacia el personaje, perder si te tocan. Ruido al caminar cerca.
4. **Botas silenciosas.** Aparecen en el campo, dan sigilo por unos segundos, indicador en pantalla.
5. **Los 10 niveles.** N toros y N monedas por nivel, reparto campo/cueva, dificultad creciente desde `src/config.js`. Guardar progreso.
6. **Pantallas.** Inicio, elegir granjero o granjera, pausa, nivel completado, perdiste y ganaste.
7. **Imágenes y sonido.** Integrar los archivos de `assets/` que ya estén (ver CLAUDE.md), música y efectos, con botón para silenciar.
8. **Pulido.** Animaciones (caminar, toros respirando, polvo al cargar), partículas al juntar monedas, probar en celular y ajustar la dificultad jugando.

Ideas para después (solo si Elías quiere): récord de tiempo por nivel, reemplazar gráficos por dibujos de Elías, más ítems especiales.
