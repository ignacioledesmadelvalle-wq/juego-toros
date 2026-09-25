# Prompts para pedirle dibujos a una IA (Claude, Gemini, etc.)

Estos prompts sirven para generar imágenes nuevas que reemplacen o sumen a las de
`assets/img/`. Guardá la que te gusta con el nombre de archivo indicado y
avisale a Claude Code para que la integre al juego.

## Estilo base (pegalo antes de cada pedido, o al principio de la conversación)

```
Ilustración plana estilo dibujo animado infantil, colores lisos y alegres,
contorno grueso marrón oscuro (#2b1d14) redondeado alrededor de cada forma,
sin sombreados con degradé ni texturas, sin líneas de boceto. Estilo vectorial
simple tipo juego para chicos, no pixel art. Fondo completamente transparente
(PNG), personaje centrado y solo (sin fondo, sin piso, sin decoración
alrededor), ocupando la mayor parte del lienzo cuadrado. Puede tener una
sombra ovalada suave y semitransparente justo debajo de los pies/patas, nada
más. Nunca mostrar texto ni marcas de agua.
```

## Personajes: vistas nuevas (de espaldas y de costado)

Hasta ahora el granjero, la granjera y el toro solo miran hacia la cámara
(hacia abajo en el juego). Para que se vean caminar de verdad hacia arriba,
abajo y a los costados, hacen falta estas vistas nuevas:

### Granjero de espaldas — `granjero-espaldas.png`
```
[Estilo base de arriba]

Un granjero de dibujos animados visto DE ESPALDAS (caminando alejándose de
cámara, hacia arriba de la pantalla): sombrero de paja ancho y redondo visto
desde atrás (no se le ve la cara), remera roja, overol de jean azul con
tiradores cruzados en la espalda, botas marrones. Cuerpo bajito y redondeado,
proporciones tiernas tipo personaje de juego para chicos de 7 años. Pose
parado, piernas separadas como en medio de un paso.
```

### Granjero de costado — `granjero-costado.png`
```
[Estilo base de arriba]

El mismo granjero (sombrero de paja, remera roja, overol de jean azul,
botas marrones, piel clara, mejillas rosadas) visto DE PERFIL COMPLETO,
mirando y caminando hacia la DERECHA de la imagen. Un brazo adelante y una
pierna adelante como en pleno paso al caminar. Se le tiene que ver la cara
de costado (un ojo, nariz y boca de perfil).
```

### Granjera de espaldas — `granjera-espaldas.png`
```
[Estilo base de arriba]

Una granjera de dibujos animados visto DE ESPALDAS (caminando alejándose de
cámara, hacia arriba de la pantalla): sombrero de paja ancho visto desde
atrás, dos trenzas rubias/doradas asomando debajo del sombrero con moñitos
rojos en las puntas, remera verde, overol de jean azul, botas marrones.
Mismas proporciones tiernas y redondeadas que el granjero. Pose parada,
piernas separadas como en medio de un paso.
```

### Granjera de costado — `granjera-costado.png`
```
[Estilo base de arriba]

La misma granjera (sombrero de paja, trenzas doradas con moñitos rojos,
remera verde, overol de jean azul, botas marrones) visto DE PERFIL COMPLETO,
mirando y caminando hacia la DERECHA de la imagen. Se le tiene que ver una
trenza colgando adelante, y la cara de perfil (un ojo, nariz y boca).
```

## Toro cargando: vistas nuevas (es el que se mueve, por eso necesita más ángulos)

El toro dormido y el toro recién despierto casi no se mueven, así que pueden
seguir mirando siempre a cámara. Pero el **toro cargando** persigue al
jugador para cualquier lado, así que necesita verse desde atrás y de costado.

### Toro cargando de espaldas — `toro-cargando-espaldas.png`
```
[Estilo base de arriba]

Un toro de dibujos animados color marrón (#7a4a2a) con manchas más oscuras,
visto DE ESPALDAS mientras EMBISTE alejándose de cámara (hacia arriba de la
pantalla): se le ven los cuartos traseros, la cola levantada y agitada, las
patas traseras en pleno galope con polvo/tierra saliendo de las pezuñas, y
apenas la punta de los cuernos blancos asomando a los costados de la cabeza
(que está agachada hacia adelante, casi sin verse). Nubecitas de polvo
alrededor de las patas. Pose dinámica, dando sensación de carrera.
```

### Toro cargando de costado — `toro-cargando-costado.png`
```
[Estilo base de arriba]

El mismo toro marrón con manchas oscuras, cuernos blancos, anillo dorado en
la nariz, visto DE PERFIL COMPLETO mientras EMBISTE hacia la DERECHA de la
imagen: cabeza agachada con un cuerno apuntando hacia adelante, ojos
enojados, boca abierta bufando, patas delanteras y traseras estiradas como
en pleno galope, cola levantada, nubes de polvo saliendo de atrás y de las
patas para mostrar velocidad.
```

## Después de generarlas

1. Guardá cada imagen en `assets/img/` con el nombre indicado arriba.
2. Si viene con fondo blanco en vez de transparente, avisale a Claude Code
   para que lo limpie (ver la nota de "Assets" en `CLAUDE.md`).
3. Claude Code se encarga de usar la imagen correcta según para dónde
   camina el personaje o hacia dónde carga el toro.
