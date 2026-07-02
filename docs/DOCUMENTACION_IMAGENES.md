# Documentación de Imágenes de Rompecabezas

Este documento registra la creación, conversión e instalación de las imágenes utilizadas para los rompecabezas de los temas **Dinosaurios** y **Mundial** en el juego Impulsamente.

Las imágenes fueron generadas mediante IA y posteriormente convertidas al formato adecuado para asegurar la compatibilidad y optimización del motor del rompecabezas.

---

## 🦖 Tema: Dinosaurios

Las imágenes para el tema de dinosaurios se encuentran ubicadas en `public/data/dinosaurios/images/`.

| Nivel | ID/Archivo | Descripción de la Imagen | Ruta de Destino |
|---|---|---|---|
| **Fácil** | `trex.jpg` | Un T-Rex animado en una selva prehistórica, colorido y de alta calidad. | `public/data/dinosaurios/images/trex.jpg` |
| **Medio** | `triceratops.jpg` | Un Triceratops en un paisaje prehistórico limpio de líneas superpuestas. | `public/data/dinosaurios/images/triceratops.jpg` |
| **Difícil** | `velociraptor.jpg` | Un Velociraptor corriendo en un entorno detallado. | `public/data/dinosaurios/images/velociraptor.jpg` |

---

## ⚽ Tema: Mundial

Las imágenes para el tema del mundial se encuentran ubicadas en `public/data/mundial/images/`.

| Nivel | ID/Archivo | Descripción de la Imagen | Ruta de Destino |
|---|---|---|---|
| **Fácil** | `messi.jpg` | Lionel Messi celebrando un gol vistiendo la camiseta de la Selección Argentina. | `public/data/mundial/images/messi.jpg` |
| **Medio** | `dibu.jpg` | Emiliano "Dibu" Martínez realizando una atajada espectacular en su arco. | `public/data/mundial/images/dibu.jpg` |
| **Difícil** | `seleccion.jpg` | El plantel de la Selección Argentina festejando con la copa y confeti en el estadio. | `public/data/mundial/images/seleccion.jpg` |

---

## 🛠️ Proceso de Preparación de Imágenes

1. **Generación**: Las imágenes se crearon usando herramientas de generación de imágenes por IA en formato PNG. Se especificó en las directrices evitar patrones de cuadrícula superpuestos para que el corte por `Canvas` no se viera alterado.
2. **Conversión**: Se utilizó un script de Python con la librería `Pillow` para procesar los archivos PNG originales de alta resolución a formato JPEG (`RGB`), garantizando su compatibilidad nativa con los JSON configurados.
3. **Distribución**: Los archivos resultantes se colocaron en sus respectivas carpetas de recursos estáticos en `public/data/`.
