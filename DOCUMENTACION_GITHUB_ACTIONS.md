# 🚀 Guía de Despliegue con GitHub Actions

Esta documentación explica detalladamente cómo está configurado el despliegue automático del juego **Superpoder: Mente Brillante** utilizando **GitHub Actions** y **GitHub Pages**.

---

## 📋 Resumen del Mecanismo

Dado que el juego es una aplicación web de una sola página (SPA) construida con **React**, **TypeScript** y **Vite**, el resultado de compilar el proyecto (`npm run build`) son archivos estáticos (HTML, JS, CSS, imágenes y audios). 

Estos archivos estáticos se pueden alojar de forma totalmente gratuita y automática en **GitHub Pages**. Hemos creado un workflow de integración y despliegue continuos (CI/CD) que realiza esta tarea en cada actualización.

---

## 🛠️ Archivo de Configuración de GitHub Actions

El archivo de workflow se encuentra creado en la ruta del proyecto:
[.github/workflows/deploy.yml](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/.github/workflows/deploy.yml)

### Estructura del Workflow:

1. **Disparador (`on.push.branches`)**: Se ejecuta automáticamente cuando se suben cambios (push) a la rama `main`.
2. **Permisos**: Requiere permisos de escritura para publicar en GitHub Pages (`pages: write`) y tokens de identidad (`id-token: write`).
3. **Pasos del Trabajo (`build-and-deploy`)**:
   * Descarga el código fuente del repositorio (`actions/checkout`).
   * Configura **Node.js 20** (`actions/setup-node`) garantizando compatibilidad con TypeScript y linter modernos.
   * Instala limpiamente las dependencias (`npm ci`).
   * Ejecuta el análisis de código (`npm run lint`) con **Oxlint**.
   * Compila el proyecto generando el bundle web optimizado (`npm run build`) en la carpeta `dist`.
   * Prepara y sube el artefacto a GitHub Pages (`actions/upload-pages-artifact`).
   * Realiza el despliegue final y expone la URL del sitio (`actions/deploy-pages`).

---

## ⚙️ Adaptación de Rutas para Subdirectorios (Crucial para GitHub Pages)

Por defecto, los proyectos en GitHub Pages se sirven en una URL con subdirectorio:
`https://<usuario>.github.io/<nombre-del-repositorio>/`

Para evitar que los recursos (imágenes, JSONs de datos y sonidos) busquen la raíz del dominio (`https://<usuario>.github.io/`) y causen errores **404 Not Found**, realizamos las siguientes optimizaciones en el código:

### 1. Ruta base dinámica en Vite
En el archivo [vite.config.ts](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/vite.config.ts) configuramos la base dinámicamente:
```typescript
base: process.env.GITHUB_ACTIONS ? '/superpoder-mentebrillante/' : '/',
```
* **En desarrollo local**: La aplicación se sirve desde la raíz `/` (ej. `http://localhost:5173/`).
* **En GitHub Actions**: Vite compila los recursos adaptados a la ruta del subdirectorio `/superpoder-mentebrillante/`.

### 2. Prefijación de peticiones `fetch` y recursos estáticos
Actualizamos todas las llamadas a recursos de la carpeta `public` para usar la variable inyectada por Vite `import.meta.env.BASE_URL`. De esta forma, el juego sabe exactamente en qué subcarpeta está alojado en tiempo de ejecución:

* **Configuraciones y Temas** ([src/engine/GameContext.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/engine/GameContext.tsx)):
  ```typescript
  fetch(`${import.meta.env.BASE_URL}config.json`)
  fetch(`${import.meta.env.BASE_URL}themes/index.json`)
  fetch(`${import.meta.env.BASE_URL}themes/${t}.json`)
  ```
* **Carga de Niveles** ([src/pages/Home.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/pages/Home.tsx)):
  ```typescript
  fetch(`${import.meta.env.BASE_URL}${selectedTheme.dataPath}/${difficultyId}.json`)
  ```
* **Imágenes del Rompecabezas y Miniaturas** ([src/components/Puzzle/Puzzle.tsx](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/components/Puzzle/Puzzle.tsx)):
  ```typescript
  await splitImage(`${import.meta.env.BASE_URL}${image}`, rows, cols)
  src={`${import.meta.env.BASE_URL}${image}`}
  ```
* **Efectos de Sonido** ([src/utils/sounds.ts](file:///home/saucedo/Escritorio/Silicon/juego-impulsamente/src/utils/sounds.ts)):
  ```typescript
  success: `${import.meta.env.BASE_URL}sounds/success.mp3`
  // ...
  ```

---

## 🚀 Pasos para Activar el Despliegue en GitHub

Para poner en marcha este flujo automático, sigue estos pasos en la web de GitHub:

1. **Subir los cambios al repositorio**: Asegúrate de que el código con el workflow y las modificaciones de rutas esté en tu rama principal (`main`).
   ```bash
   git add .
   git commit -m "feat: setup github actions deploy and route base path"
   git push origin main
   ```

2. **Habilitar GitHub Actions para Pages**:
   * Entra a tu repositorio en GitHub.
   * Haz clic en la pestaña **Settings** (Configuración) en el menú superior.
   * En el menú lateral izquierdo, haz clic en **Pages**.
   * En la sección **Build and deployment**, busca la opción **Source** (Origen).
   * Cambia el desplegable de `Deploy from a branch` a **`GitHub Actions`**.

3. **Verificar la ejecución**:
   * Ve a la pestaña **Actions** (Acciones) en tu repositorio.
   * Verás una ejecución en curso llamada **Desplegar en GitHub Pages**.
   * Una vez que finalice en verde (aprox. 1-2 minutos), te mostrará la URL pública de tu juego.

---

> [!NOTE]
> **Compatibilidad de compilación local vs. remota**
> Si intentas compilar o pasar el linter localmente en tu máquina actual, podrías experimentar fallos relacionados con la versión instalada de Node.js (por ejemplo, si tienes Node 12.x localmente, el cual es incompatible con las sintaxis modernas de TypeScript y las dependencias de Oxlint). No te preocupes: **el flujo de GitHub Actions utiliza Node 20 de forma aislada en la nube**, asegurando que el despliegue funcione sin problemas independientemente de tu entorno local.
