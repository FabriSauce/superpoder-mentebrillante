# Documentación: Diseño, Alineación y Dimensionamiento

Este documento detalla los cambios realizados en el diseño del juego **Impulsamente** para mejorar la visualización, la escala y la alineación de los componentes, además de servir como guía sobre **dónde y cómo ajustar estas propiedades**.

---

## 🎯 Objetivo de los Cambios

La interfaz presentaba un diseño donde la tarjeta contenedora y sus elementos interiores se alineaban en la parte superior y se veían reducidos en tamaño en pantallas de escritorio, dejando un espacio vacío considerable en la parte inferior.

Para mejorar la ergonomía y estética (haciendo que el juego sea visualmente impactante y adaptado a niños):
1. **Centrado Vertical:** Se alinearon verticalmente todos los flujos de pantalla en el centro de la tarjeta del contenedor principal.
2. **Mayor Escala:** Se ampliaron las proporciones de los contenedores y los elementos interactivos claves (códigos secretos, inputs, botones, tablero del rompecabezas).
3. **Animaciones Dinámicas:** Se añadieron micro-animaciones interactivas (escalado en botones y elementos) para hacer el juego interactivo y dinámico.

---

## 📂 ¿Dónde se realizan estos ajustes en el código?

Si deseas modificar el centrado o los tamaños de la interfaz en el futuro, estas son las ubicaciones exactas en la base de código:

### 1. Centrado de la Tarjeta y Tamaño General
* **Archivo:** [App.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/App.tsx)
* **Propiedades a modificar:**
  * En la tarjeta blanca principal (alrededor de la línea 16), se configuró `display: 'flex'`, `flexDirection: 'column'` y `justifyContent: 'center'`. Esto distribuye y centra verticalmente cualquier fase de juego activa (`Home`, `Game`, `GameComplete`).
  * `maxWidth` se incrementó a `'1050px'` para dotar de suficiente anchura a la interfaz principal en pantallas medianas y grandes.

### 2. Ancho de la Pantalla de Juego y Títulos
* **Archivo:** [Game.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/pages/Game.tsx)
* **Propiedades a modificar:**
  * El div contenedor de la partida (línea 66) se configuró con `maxWidth: '950px'` y `width: '100%'` (anteriormente limitado a `600px`).
  * La tipografía del título del nivel `h2` (línea 112) aumentó su tamaño a `fontSize: '2rem'` y sus márgenes verticales a `margin: '1.5rem 0'`.

### 3. Descifrador de Código Secreto (SecretCode)
* **Archivo:** [SecretCode.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/components/SecretCode/SecretCode.tsx)
* **Propiedades a modificar:**
  * **Leyenda de símbolos (Ej. ■ = M):** El tamaño de fuente de los símbolos aumentó a `fontSize: '3.5rem'` y las letras a `fontSize: '1.2rem'`. La separación se gestiona con `display: 'flex'` y `gap: '1rem'`.
  * **Símbolos del Código Secreto:** `symbolStyle` se aumentó a `fontSize: '3.5rem'`.
  * **Campo de Respuesta (`inputStyle`):** El campo de texto se rediseñó con un ancho de `width: '280px'`, tipografía de `fontSize: '1.6rem'` y relleno interior de `padding: '16px 20px'`.
  * **Placeholder del Campo de Respuesta:** Se vinculó con la clase CSS `.secret-code-input` en [index.css](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/index.css) para que las palabras del placeholder ("Tu respuesta") se vean más pequeñas (`fontSize: '1rem'`), sin forzar mayúsculas y con espaciado de letras normal.
  * **Botón de Verificar:** Se incrementó su tamaño (`padding: '14px 44px'`, `fontSize: '1.3rem'`) y se agregó una animación al pasar el ratón (`onMouseEnter`/`onMouseLeave` con `transform: scale(1.05)`).

### 4. Tablero del Rompecabezas (Puzzle)
* **Archivo:** [Puzzle.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/components/Puzzle/Puzzle.tsx)
* **Propiedades a modificar:**
  * **Dimensionamiento Dinámico y Responsivo:** Se introdujo la variable `isDesktop` (según `window.innerWidth >= 768`) para calcular dinámicamente el tamaño del tablero y del visor.
  * **Ancho del Tablero:** En escritorio, el ancho máximo del tablero escala hasta `750px` (`Math.min(750, window.innerWidth - 320)`), lo que permite aprovechar óptimamente las pantallas grandes; mientras que en dispositivos móviles se mantiene limitado a `480px` para ajustarse perfectamente al ancho de pantalla.
  * **Distribución de Elementos (Lado a Lado):** Se organizan en fila (`flexDirection: 'row'`, `flexWrap: 'wrap'`, `gap: '1.5rem'`), colocando la guía **al costado** en pantallas de escritorio sin tener que hacer scroll, y apilándose automáticamente en pantallas reducidas.
  * **Imagen de Guía Visual:** La miniatura tiene un tamaño máximo de `200px` en escritorio y `150px` en dispositivos móviles. Al pasar el cursor, realiza un **zoom interactivo de 2.2x** (`scale(2.2)`) y se eleva (`zIndex: 10`) con una sombra fluida para permitir una visualización detallada del modelo.

---

## 🛠️ Verificación y Validación de Diseños

Los cambios mantienen la compatibilidad responsiva total (usando `maxWidth`, porcentajes y `Math.min`), de modo que en pantallas de teléfonos móviles o tablets el juego se reduce proporcionalmente para evitar desbordamientos, mientras que en pantallas anchas aprovecha óptimamente el espacio disponible.
