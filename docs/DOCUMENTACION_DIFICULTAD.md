# Documentación: Selección de Dificultad por Edad

Esta documentación detalla la implementación del selector de nivel de dificultad según la edad del niño antes de iniciar una partida.

---

## 📋 Descripción del Cambio

Originalmente, al presionar un tema de juego (como "Mundial" o "Dinosaurios"), el sistema cargaba y ejecutaba de forma consecutiva e ininterrumpida los tres niveles disponibles (`fácil`, `medio` y `difícil`). 

Para mejorar la experiencia y adaptarla a las capacidades cognitivas del niño, se implementó un **Selector de Dificultad por Edad** mediante un modal interactivo en la pantalla principal. Ahora, el niño juega **únicamente** la dificultad seleccionada que corresponda a su edad, asegurando un desafío apropiado y evitando frustraciones o aburrimiento.

---

## 🧒 Rangos de Edad y Mapeo de Niveles

La dificultad se divide en tres niveles lúdicos y visualmente identificables:

| Rango de Edad | Nombre en el Juego | Dificultad Técnica | Emojis | Archivo JSON Cargado | Características |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **4 a 6 años** | Explorador Junior | Fácil | 🐣🌟 | `facil.json` | Criptograma simple (4 letras), rompecabezas de 2x2 piezas. |
| **7 a 9 años** | Súper Explorador | Medio | 🦊🚀 | `medio.json` | Criptograma intermedio (4-5 letras), rompecabezas de 2x3 piezas. |
| **10 o más años** | Leyenda del Espacio | Difícil | 🦁🏆 | `dificil.json` | Criptograma complejo (8 letras), rompecabezas de 2x4 piezas. |

---

## 🛠️ Detalles de la Implementación Técnica

### 1. Interfaz de Usuario (`src/pages/Home.tsx`)
- Se agregó el estado local `selectedTheme` para retener temporalmente el tema seleccionado mientras el niño elige la dificultad.
- Se agregó el estado `isLoading` para deshabilitar las interacciones durante la carga asíncrona del nivel.
- Se diseñó un modal interactivo usando el componente `Modal` ya existente, adaptado con un grid responsivo que muestra tres tarjetas de dificultad grandes con degradados de colores vibrantes y emojis llamativos.
- Al hacer clic en una tarjeta de dificultad, se ejecuta la función asíncrona `handleSelectDifficulty(difficultyId)`.

### 2. Carga Condicional de Niveles
La función `handleSelectDifficulty` realiza los siguientes pasos:
1. Despacha el tema seleccionado al estado del juego (`SELECT_THEME`).
2. Realiza un `fetch` dinámico únicamente para el archivo JSON correspondiente a la dificultad elegida (ej. `/data/mundial/facil.json`).
3. Despacha el nivel obtenido como un arreglo de un solo elemento a la acción `SET_LEVELS`.
4. Llama a la acción `START_LEVEL` para iniciar la fase de juego en el nivel cargado.

### 3. Flujo de Finalización de Partida (`src/pages/Game.tsx`)
Dado que el arreglo de niveles contiene un único elemento (el nivel seleccionado), el motor de juego (`Game.tsx`) interpreta automáticamente que este es el último nivel de la partida:
- `isLastLevel` resulta verdadero (`0 >= 1 - 1`).
- Al completar el rompecabezas del nivel, el juego no avanza al siguiente, sino que finaliza inmediatamente despachando `GAME_COMPLETE` y mostrando la pantalla final con el puntaje final y estadísticas (tiempo y errores).
