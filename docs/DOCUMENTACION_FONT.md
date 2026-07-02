# Documentación: Tipografía Monocraft para Títulos

Este documento describe la integración de la fuente tipográfica **Monocraft** en la aplicación web del juego **Impulsamente**, explicando las decisiones técnicas de diseño, la configuración de los estilos globales y las optimizaciones para el soporte sin conexión.

---

## 🎨 Decisión de Diseño: Estilo Retro/Pixel-art

Para reforzar el concepto de gamificación y la estética lúdica orientada a niños, se ha seleccionado la tipografía **Monocraft** para todos los títulos y encabezados de la interfaz. 

Monocraft es una fuente monoespaciada pixelada inspirada en la tipografía de *Minecraft*. Sus características principales son:
* **Legibilidad lúdica**: Mantiene una estructura clara y un tamaño idóneo para encabezados y botones grandes.
* **Estilo retro/digital**: Encaja perfectamente con la temática de descifrar códigos secretos y resolver rompecabezas.

---

## 💾 Alojamiento Local y Estrategia Offline (APK)

Al empaquetar la aplicación con **Capacitor** para generar el archivo APK de Android, o al subir el sitio a GitHub Pages, la aplicación debe responder de forma inmediata incluso si el dispositivo móvil no tiene conexión a Internet.

Por esta razón:
* **No se utilizó un CDN**: Cargar la fuente desde un servidor externo (como jsDelivr) provocaría un retardo visual ("Flicker of Unstyled Text") o la imposibilidad de mostrar la fuente si el usuario juega sin conexión.
* **Alojamiento en el proyecto**: El archivo binario de la fuente se guardó localmente en la ruta del código fuente:
  `src/assets/fonts/Monocraft.ttf`

---

## 🛠️ Configuración e Implementación

### 1. Declaración `@font-face` y Aplicación Global
La fuente se declaró y vinculó dentro del archivo de estilos globales [index.css](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/index.css):

```css
@font-face {
  font-family: 'Monocraft';
  src: url('./assets/fonts/Monocraft.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Monocraft', monospace;
}
```

Al utilizar una ruta relativa (`./assets/fonts/Monocraft.ttf`), el compilador **Vite** procesa automáticamente el archivo durante la fase de construcción (`npm run build`), lo optimiza, lo copia en la carpeta de distribución (`dist/assets/`) con un hash único en su nombre para evitar problemas de caché, y actualiza la ruta final en el archivo CSS empaquetado.

### 2. Elementos Afectados
El selector global para encabezados (`h1` a `h6`) aplica automáticamente la fuente a:
* **Título Principal de la App** ("Superpoder: Mente Brillante" en [Home.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/pages/Home.tsx)).
* **Títulos de los Temas de Juego** (Dinosaurios y Mundial en [Home.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/pages/Home.tsx)).
* **Título del Modal de Selección de Dificultad** ("¡Elige tu nivel de Súper Héroe!" en [Modal.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/components/Modal/Modal.tsx)).
* **Títulos de las Fases de Juego** ("Descifra el código secreto" en [SecretCode.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/components/SecretCode/SecretCode.tsx) y "Arma el rompecabezas" en [Puzzle.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/components/Puzzle/Puzzle.tsx)).
* **Títulos de Transición y Finalización** ("¡Nivel Completado!" en [Game.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/pages/Game.tsx) e "¡Juego Completado!" en [GameComplete.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/pages/GameComplete.tsx)).

---

## 🔍 Verificación del Cambio

1. **Compilación en Producción**: Ejecutar `npm run build` confirma que la fuente se empaqueta correctamente y se coloca en la carpeta `dist`.
2. **Visualización de Recursos**: Las llamadas de red locales confirman que la fuente se carga correctamente de forma relativa al index.html y no hay peticiones a dominios externos.
3. **Consistencia de Estilos**: Al no definir una propiedad inline `fontFamily` en la mayoría de los componentes de React, los textos heredan automáticamente la fuente declarada a nivel CSS sin pisar otras propiedades de diseño (márgenes, rellenos y colores).
