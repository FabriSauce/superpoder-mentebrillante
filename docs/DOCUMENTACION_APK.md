# Guía para Generar la APK (Android) sin Afectar el Contenido

Para empaquetar el juego **Impulsamente** (desarrollado con React + Vite + TypeScript) en una aplicación de Android (archivo APK) sin realizar modificaciones intrusivas en el código web, la herramienta estándar y recomendada es **Capacitor** (desarrollada por Ionic).

Capacitor actúa como un puente nativo y contenedor web moderno. Toma el compilado de producción web (la carpeta `dist`) y lo ejecuta dentro de un componente WebView optimizado en un proyecto nativo de Android.

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu máquina de desarrollo:
1. **Android Studio**: Descargado e instalado.
2. **Android SDK**: Configurado desde Android Studio (SDK Manager), asegurando tener instaladas las herramientas de plataforma correspondientes.
3. **JDK 17** (o superior): Generalmente viene incluido dentro de Android Studio, pero es necesario que las variables de entorno de Java estén bien configuradas en tu sistema si decides compilar desde la terminal.

---

## 🚀 Paso a Paso para Configurar Capacitor

Sigue estos pasos en la terminal en la raíz del proyecto para añadir el soporte de Android:

### 1. Instalar las dependencias de Capacitor
Instala el núcleo de Capacitor y su interfaz de línea de comandos (CLI) como dependencias de desarrollo:
```bash
npm install @capacitor/core @capacitor/cli
```

### 2. Inicializar Capacitor en el proyecto
Inicializa la configuración básica de Capacitor. Te hará algunas preguntas interactivas:
```bash
npx cap init
```
* **App name**: `Impulsamente` (o el nombre que desees).
* **App Package ID**: `com.impulsamente.juego` (identificador único, estilo dominio invertido).
* **Web directory**: `dist` (muy importante, es la carpeta donde Vite genera el build).

Esto creará un archivo de configuración llamado `capacitor.config.json` (o `capacitor.config.ts`).

### 3. Instalar la plataforma Android
Instala el paquete de Android para Capacitor:
```bash
npm install @capacitor/android
```

### 4. Añadir la plataforma al proyecto
Crea la carpeta nativa `android/` en tu proyecto:
```bash
npx cap add android
```

> [!NOTE]
> La carpeta `android/` generada es un proyecto completo de Android Studio Gradle. No debes modificarla directamente, a menos que necesites cambiar cosas muy específicas como permisos nativos o el ícono de la app.

---

## 📦 Flujo de Trabajo para Generar el APK

Cada vez que realices cambios en tu código React y quieras probarlos o generar una nueva APK, debes seguir este flujo de 3 pasos:

### Paso 1: Compilar la aplicación web
Genera los archivos de producción estáticos de React/Vite en la carpeta `dist`:
```bash
npm run build
```

### Paso 2: Sincronizar el contenido web con Android
Copia el contenido recién compilado de `dist/` a los recursos nativos del proyecto Android:
```bash
npx cap sync
```

### Paso 3: Compilar y generar la APK
Hay dos métodos para generar el archivo `.apk` final:

#### Método A: Desde Android Studio (Recomendado)
Abre el proyecto de Android generado directamente en Android Studio con el siguiente comando:
```bash
npx cap open android
```
Una vez abierto Android Studio:
1. Espera a que termine la indexación de Gradle (puede tardar un par de minutos la primera vez).
2. En la barra de menú superior, ve a **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
3. Al finalizar, aparecerá una notificación abajo a la derecha indicando que el APK se generó correctamente. Haz clic en **locate** para abrir el explorador de archivos donde se encuentra el archivo `app-debug.apk`.

#### Método B: Desde la Terminal (Línea de Comandos)
Si prefieres no abrir la interfaz gráfica de Android Studio, puedes compilarlo directamente desde la consola usando Gradle Wrapper:
```bash
cd android
./gradlew assembleDebug
```
El archivo APK generado se ubicará en:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🔍 Preguntas Frecuentes y Consideraciones

* **¿Cómo se manejan los assets y archivos JSON en la app?**
  Capacitor levanta un servidor web interno local (`http://localhost`) que sirve los archivos estáticos de tu carpeta `dist`. Esto significa que las llamadas `fetch` relativas que realizas para leer los archivos JSON de los niveles de rompecabezas en `public/data/` funcionarán de manera idéntica a como lo hacen en el navegador web, sin generar problemas de CORS o rutas rotas.

* **¿Cómo se actualiza la app?**
  Si editas tus JSONs, imágenes o código TypeScript, simplemente ejecuta:
  ```bash
  npm run build && npx cap sync
  ```
  Y vuelve a generar la APK desde Android Studio o la consola.

* **¿Es necesario agregar la carpeta `android/` al `.gitignore`?**
  No necesariamente. Es una buena práctica versionar la carpeta `android/` en Git, ya que allí se guardarán configuraciones nativas como los íconos de la aplicación (los launchers), las pantallas de carga (splash screens) y configuraciones especiales en el archivo `AndroidManifest.xml`.
