# 🧠 Superpoder: Mente Brillante (Juego Impulsamente)

¡Bienvenido al juego **Superpoder: Mente Brillante**! Esta es una aplicación interactiva y educativa diseñada especialmente para niños, orientada al desarrollo cognitivo, la atención selectiva, el razonamiento lógico y el control de impulsos. El juego combina el descifrado de códigos con la resolución de rompecabezas interactivos.

---

## 🎮 Mecánica del Juego

El juego se divide en **niveles**. Cada nivel consta de dos fases consecutivas que desafían diferentes habilidades:

1. **Fase 1: Descifrado del Código Secreto (Criptograma)**
   * Se presenta una tabla de equivalencias donde cada símbolo visual (ej. `■`, `●`, `▲`) se corresponde con una letra del alfabeto.
   * El niño debe descifrar un código secreto analizando los símbolos e ingresando la palabra correspondiente.
   * *Objetivo*: Fomentar la concentración, la asociación lógica y la paciencia.

2. **Fase 2: Rompecabezas Interactivo (Puzzle)**
   * Una vez descifrada la palabra, esta revela una imagen temática (relacionada con la palabra resuelta) troceada en piezas desordenadas.
   * El niño debe ordenar y colocar las piezas en su cuadrícula correcta arrastrándolas o intercambiándolas sobre el tablero.
   * *Objetivo*: Desarrollar la percepción visoespacial y la coordinación motriz.

---

## 🧒 Dificultades Adaptadas por Edad

Para brindar una experiencia óptima y adaptiva a las capacidades cognitivas del niño, el juego incluye un **Selector de Dificultad por Edad** antes de iniciar la partida. De esta forma, el niño juega en un entorno adaptado que evita tanto el aburrimiento como la frustración.

| Rango de Edad | Nombre en el Juego | Dificultad | Emojis | Tamaño del Rompecabezas | Características Cognitivas | Archivo JSON Cargado |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **4 a 6 años** | Explorador Junior | Fácil | 🐣🌟 | **2x2** (4 piezas) | Criptograma simple (4 letras), piezas grandes y fáciles de ubicar. | `facil.json` |
| **7 a 9 años** | Súper Explorador | Medio | 🦊🚀 | **2x3** (6 piezas) | Criptograma intermedio (4-5 letras), aumento en la complejidad espacial. | `medio.json` |
| **10+ años** | Leyenda del Espacio | Difícil | 🦁🏆 | **2x4** (8 piezas) | Criptograma complejo (8 letras), desafío de memoria y organización visoespacial. | `dificil.json` |

Para más detalles técnicos de esta implementación, consulta [DOCUMENTACION_DIFICULTAD.md](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/DOCUMENTACION_DIFICULTAD.md).

---

## 🖼️ Temáticas y Recursos del Juego

El juego incluye dos grandes temáticas con imágenes generadas por inteligencia artificial y optimizadas para el tablero de juego:

### 🦖 Tema: Dinosaurios
* **Fácil**: Imagen de un *T-Rex* animado en la selva (`trex.jpg`).
* **Medio**: Imagen de un *Triceratops* en un paisaje limpio (`triceratops.jpg`).
* **Difícil**: Imagen de un *Velociraptor* corriendo en un entorno detallado (`velociraptor.jpg`).

### ⚽ Tema: Mundial
* **Fácil**: *Lionel Messi* celebrando un gol con la camiseta de la selección (`messi.jpg`).
* **Medio**: *Dibu Martínez* realizando una atajada espectacular (`dibu.jpg`).
* **Difícil**: La *Selección Argentina* festejando la copa con confeti (`seleccion.jpg`).

Para conocer más sobre el procesamiento de estas imágenes y su resolución, consulta [DOCUMENTACION_IMAGENES.md](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/DOCUMENTACION_IMAGENES.md).

---

## 👁️ Guía Visual del Rompecabezas

Para asistir a los más pequeños o a quienes necesiten un punto de referencia visual, se implementó una **Guía Visual**:
* Muestra de forma automática una miniatura tipo **Polaroid** de la imagen completa de referencia justo debajo del tablero.
* Cuenta con un **Botón Toggle** (`👁️ Ocultar Guía` / `👁️ Mostrar Guía`) para los niños que prefieran un desafío mayor sin ayudas.
* Añade una **micro-animación** que amplía la miniatura ligeramente (`scale(1.08)`) al pasar el cursor o pulsar sobre ella.
* El diseño se adapta de manera totalmente responsiva ampliando el tablero hasta un máximo de `500px` de ancho en pantallas grandes.

Para más detalles, consulta [DOCUMENTACION_GUIA_PUZZLE.md](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/DOCUMENTACION_GUIA_PUZZLE.md).

---

## 🛠️ Estructura del Proyecto

La arquitectura del código se divide de forma limpia y desacoplada siguiendo buenas prácticas de desarrollo:

```
juego-impulsamente/
├── public/                      # Recursos estáticos servidos en el juego
│   ├── data/                    # JSONs de configuración por nivel
│   │   ├── dinosaurios/         # Imágenes y niveles del tema Dinosaurios
│   │   └── mundial/             # Imágenes y niveles del tema Mundial
│   ├── themes/                  # Archivos de metadatos de los temas de juego
│   ├── config.json              # Configuración global de la aplicación (HUD, sonido)
│   ├── favicon.svg              # Logo de la app
│   └── sounds/                  # Efectos de audio (aciertos, errores)
├── src/                         # Código fuente de React + TypeScript
│   ├── assets/                  # Estilos o imágenes compilables
│   ├── components/              # Componentes visuales atómicos y reutilizables
│   │   ├── Button/              # Botón personalizado con estilos y feedback
│   │   ├── Modal/               # Ventanas emergentes (selector de dificultad)
│   │   ├── ProgressBar/         # Indicador de progreso durante la partida
│   │   ├── Puzzle/              # Motor visual de corte y renderizado del rompecabezas
│   │   └── SecretCode/          # Formulario e interfaz del criptograma
│   ├── engine/                  # Lógica de juego y control de estado
│   │   ├── CodeEngine.ts        # Algoritmos de validación del criptograma
│   │   ├── PuzzleEngine.ts      # Utilidades para mezclar y cortar piezas (Canvas)
│   │   └── GameContext.tsx      # Provider de React con el Reducer del estado global
│   ├── pages/                   # Vistas/Pantallas principales del juego
│   │   ├── Home.tsx             # Inicio y selección de tema/dificultad
│   │   ├── Game.tsx             # Flujo de partida (Criptograma -> Rompecabezas)
│   │   └── GameComplete.tsx     # Resultados finales con puntajes, tiempos y errores
│   ├── types.ts                 # Declaración de tipos TypeScript y tipos de acciones
│   ├── index.css                # Sistema de diseño, variables de color CSS y layouts
│   ├── App.tsx                  # Enrutador principal de fases y contenedor de la app
│   └── main.tsx                 # Entrada de ejecución de la aplicación web
├── DOCUMENTACION_APK.md         # Manual paso a paso para compilar APK
├── DOCUMENTACION_DIFICULTAD.md  # Detalle del Selector de Dificultad
├── DOCUMENTACION_GUIA_PUZZLE.md # Detalle de la Guía Visual Polaroid
├── DOCUMENTACION_IMAGENES.md    # Registro y procesamiento de assets visuales
├── package.json                 # Gestión de dependencias
└── tsconfig.json                # Configuración de compilación TypeScript
```

---

## 🚀 Cómo Iniciar en Desarrollo

Sigue estos pasos para levantar el entorno de desarrollo local:

### 1. Clonar el repositorio e instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor local
```bash
npm run dev
```
La aplicación estará disponible por defecto en `http://localhost:5173`.

### 3. Analizar el código (Linter rápido con Oxlint)
```bash
npm run lint
```

---

## 📱 Compilación e Instalación como APK (Android)

Este juego está completamente optimizado para compilarse en una aplicación nativa de Android (.APK) utilizando **Capacitor de Ionic** como puente.

### Flujo de compilación rápida:
1. Generar compilado web:
   ```bash
   npm run build
   ```
2. Sincronizar activos con el módulo Android nativo:
   ```bash
   npx cap sync
   ```
3. Compilar APK:
   * **Con Android Studio**: Abre con `npx cap open android` y haz clic en *Build > Build Bundle(s) / APK(s) > Build APK(s)*.
   * **Por terminal (Gradle)**: Ejecuta desde la consola:
     ```bash
     cd android && ./gradlew assembleDebug
     ```

Para un tutorial guiado completo de configuración inicial de dependencias de desarrollo de Android, variables de entorno y optimizaciones, consulta la guía [DOCUMENTACION_APK.md](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/DOCUMENTACION_APK.md).
