# Documentación: Guía Visual del Rompecabezas

Este documento detalla la implementación de la **Guía Visual del Rompecabezas**, una funcionalidad diseñada para ayudar a los niños a visualizar cómo debe quedar el rompecabezas completamente armado en cada nivel.

---

## 🎯 Objetivo de la Funcionalidad

El rompecabezas del juego requiere que el niño reordene las piezas en el tablero. Para los niños (especialmente en el rango de **Explorador Junior**, de 4 a 6 años), puede resultar difícil saber dónde colocar cada pieza sin una referencia clara.

La **Guía Visual** soluciona esto mostrando una vista previa de la imagen original completa directamente en la pantalla de juego, funcionando como un modelo a seguir.

---

## 🎨 Diseño UX/UI

La guía visual ha sido diseñada siguiendo un enfoque interactivo, limpio y amigable para niños:

1. **Visibilidad por Defecto**: Al iniciar la fase de rompecabezas, la miniatura de la imagen completa aparece de forma automática abajo del tablero.
2. **Estilo Físico/Polaroid**: La miniatura cuenta con bordes redondeados, un borde blanco sutil y una sombra tridimensional suave, simulando una foto física de referencia.
3. **Botón de Mostrar/Ocultar**: Se agregó un botón interactivo `"👁️ Ocultar Guía" / "👁️ Mostrar Guía"` para que los niños que buscan un mayor nivel de dificultad puedan jugar sin la imagen de referencia.
4. **Efecto de Ampliación (Micro-animación)**: Al pasar el cursor o pulsar la miniatura, esta se amplía ligeramente (`scale(1.08)`) indicando interactividad y permitiendo apreciar detalles pequeños más fácilmente.

---

## 🛠️ Detalles de Implementación Técnica

Los cambios se realizaron en el componente principal del rompecabezas:

### Archivo Modificado
- [Puzzle.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/components/Puzzle/Puzzle.tsx)

### Estructura de Código

* **Estado Local (`showGuide`)**:
  ```tsx
  const [showGuide, setShowGuide] = useState(true);
  ```
  Permite alternar la visualización de la miniatura de la imagen completa.

* **Renderizado Condicional e Interactivo**:
  El botón toggle y la sección de guía se muestran únicamente si el rompecabezas **no** se ha completado (`!complete`), evitando ruidos visuales durante la pantalla de celebración:
  ```tsx
  {!complete && (
    <div style={{ marginTop: '1.5rem' }}>
      <button onClick={() => setShowGuide(!showGuide)} ... >
        {showGuide ? '👁️ Ocultar Guía' : '👁️ Mostrar Guía'}
      </button>

      {showGuide && (
        <div>
          <p>Así debe quedar:</p>
          <div onMouseEnter={...} onMouseLeave={...}>
            <img src={`/${image}`} alt="Guía del rompecabezas" />
          </div>
        </div>
      )}
    </div>
  )}
  ```

---

## 📱 Verificación y Layout

- **Tamaño del Rompecabezas**: El ancho máximo del tablero del rompecabezas se incrementó de `360px` a `500px` (`Math.min(500, window.innerWidth - 32)`) para aprovechar de mejor manera las pantallas más grandes, facilitando la jugabilidad y la visualización de los detalles por parte del niño.
- **Resolución Responsiva**: La miniatura está limitada a un ancho máximo de `150px` con una anchura adaptable al contenedor, evitando que rompa la interfaz en dispositivos móviles.
- **Ruta de Recursos**: La imagen de guía utiliza el prop `image` que lee directamente la ruta estática configurada en los archivos JSON de dificultad (por ejemplo, `public/data/mundial/images/seleccion.jpg`), asegurando consistencia con las imágenes troceadas del rompecabezas.
