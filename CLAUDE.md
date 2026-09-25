# El Mundo de Gliff

Juego creado por Elías (7-10 años) junto a su papá. Las ideas del juego son de Elías:
respetalas y, si algo no está claro, preguntá antes de inventar.

## Cómo trabajar

- Todo en español: textos del juego, comentarios del código y tus respuestas.
- Quien te escribe puede ser un chico de 7 a 10 años. Explicá simple, corto y con entusiasmo. Nada de jerga técnica si no la piden.
- Avanzá de a una etapa del `PLAN.md`. Al terminar cada etapa: probá que funcione, hacé un commit con git y contá en 2-3 líneas qué se puede probar ahora.
- Nunca borres ni reescribas algo que ya funciona sin avisar.
- Todos los números del juego (velocidades, tiempos, cantidades) van en `src/config.js` para poder ajustarlos fácil.
- Para probar: `npx serve .` y abrir en el navegador. Tiene que funcionar en compu y en tablet/celular.

## Tecnología

- Phaser 3 cargado desde CDN (sin build, sin bundlers).
- `index.html` + módulos en `src/` (una escena por archivo).
- Escala automática (`Phaser.Scale.FIT`) para cualquier pantalla, horizontal.
- Gráficos y sonidos: usar los archivos de `assets/` (ver sección "Assets"). Si un archivo todavía no existe, usar un reemplazo dibujado o generado con código, así el juego funciona igual, y cambiarlo cuando aparezca el archivo.
- Guardar progreso y récord con `localStorage`.

## El juego

**Vista:** desde arriba (cenital). Estilo dibujo animado, colorido, de día con sol. Campo verde con pasto, flores, alguna cerca.

**Personaje:** al empezar se elige granjero o granjera. Se mueve libremente en todas direcciones.

**Controles:**
- Compu: flechas o WASD.
- Táctil: joystick virtual en pantalla (abajo a la izquierda).

**Mapa de cada nivel:**
- La **casa del granjero** en un extremo: es donde empezás y adonde tenés que volver.
- La **cueva de los toros** en el otro extremo.
- Los **toros durmiendo** en el campo, entre la casa y la cueva (dentro de la cueva no hay toros).
- **Monedas**: algunas en el campo y otras dentro de la cueva.
- **Botas silenciosas** que aparecen en el campo.

**Objetivo del nivel:** juntar todas las monedas y volver a la casa. Al llegar a casa, los toros se vuelven a dormir y pasás de nivel.

**Cantidades por nivel:** en el nivel N hay N toros y N monedas. Son 10 niveles.
Reparto de monedas: aproximadamente la mitad en la cueva y el resto en el campo (en el nivel 1, la moneda está en la cueva).

**Los toros:**
- Empiezan dormidos (con "Zzz" flotando).
- Con el tiempo se van despertando **de a uno**. Antes de despertarse avisan (se mueven, abren un ojo, un "!" encima) para dar tiempo a reaccionar.
- Si caminás cerca de un toro dormido, hacés ruido y se despierta más rápido.
- Un toro despierto se levanta, bufa y **carga** hacia el personaje.
- Si un toro te toca: **perdés**. Pantalla de "¡Te atrapó el toro!" y se reintenta ese mismo nivel.
- Cuanto más alto el nivel, más rápido se despiertan.

**Botas silenciosas (sigilo):**
- Aparecen en el campo; las agarrás pasando por encima.
- Mientras duran, tus pasos no hacen ruido: podés pasar cerca de los toros sin despertarlos.
- Duran unos segundos, con una barrita o brillo que muestra cuánto les queda.

**Pantallas:**
1. Inicio con el nombre del juego y botón Jugar.
2. Elegir personaje (granjero o granjera).
3. Juego, con: nivel, monedas juntadas / total, indicador de botas, botón de pausa y botón de sonido.
4. Nivel completado.
5. Perdiste (reintentar nivel o volver al inicio).
6. ¡Ganaste! al terminar el nivel 10.

**Sonido:** música alegre de campo durante el juego y efectos: pasos, ronquidos de toros, mugido/bufido al despertarse, moneda, botas, ganar y perder. Siempre con botón para silenciar.

## Assets

Ya hay una primera versión de todos los archivos, generada con código (scripts en `herramientas/`, se corren desde la raíz del proyecto). Se pueden reemplazar en cualquier momento por dibujos de los chicos o por imágenes y sonidos de Gemini (prompts en `GEMINI-PROMPTS.md`) usando el mismo nombre de archivo.

**Imágenes** (`assets/img/`, PNG):
- `granjero.png`, `granjera.png`: personajes elegibles.
- `toro-dormido.png`, `toro-despierto.png`, `toro-cargando.png`: estados del toro.
- `moneda.png`, `botas-silenciosas.png`
- `casa.png`, `cueva.png`
- `pasto.png` (textura que se repite de fondo), `arbusto.png`, `cerca.png` (decoración)
- `fondo-inicio.png` (pantalla de inicio, 16:9), `logo.png` (título del juego)

**Música** (`assets/music/`, MP3):
- `menu.mp3` (loop en el inicio y elegir personaje)
- `juego.mp3` (loop durante el nivel)
- `nivel-completado.mp3`, `ganaste.mp3`, `perdiste.mp3` (se tocan una vez)

**Efectos** (`assets/sfx/`, MP3):
- `pasos.mp3` (al caminar, más bajito con botas), `ronquido.mp3` (toros dormidos, volumen bajo y con variación)
- `alerta.mp3` (toro por despertarse), `mugido.mp3` (se despierta), `bufido.mp3` (antes de cargar), `galope.mp3` (cargando)
- `moneda.mp3`, `botas.mp3` (agarrar botas), `botas-fin.mp3` (se terminan las botas), `click.mp3` (botones)

Notas para las imágenes:
- Personajes y toros miran hacia abajo (hacia quien mira la pantalla). `cerca.png` es horizontal y `pasto.png` es un mosaico que se repite sin cortes.
- Si la música en loop hace un pequeño corte al repetirse (pasa a veces con MP3), convertila a OGG con ffmpeg y cargá los dos formatos.
- Pueden venir con fondo blanco en vez de transparente. Si pasa, quitá el fondo con un script (por ejemplo Python + Pillow) y guardá la versión limpia.
- Pueden venir en tamaños grandes o distintos: escalalas en el juego para que se vean proporcionadas (el toro más grande que el personaje, la moneda chica).
- Los personajes y toros miran en una sola dirección: rotalos o espejalos según hacia dónde se mueven.

## Dibujos de Elías y sus amigos

Los chicos pueden dibujar sus propias versiones de los personajes y objetos. Cuando aparezca una foto o escaneo de un dibujo:
1. Quitale el fondo del papel (dejá solo el dibujo, fondo transparente) y recortalo al contenido.
2. Guardalo en `assets/img/` con el nombre del archivo que reemplaza (por ejemplo `toro-dormido.png`) y mové la versión anterior a `assets/img/original/`.
3. Ajustá el tamaño en el juego para que quede proporcionado.
Tratá los dibujos con mucho cariño: no los "corrijas" ni los redibujes, se usan tal cual.
