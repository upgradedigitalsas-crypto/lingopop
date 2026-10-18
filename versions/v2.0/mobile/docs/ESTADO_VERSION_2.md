# LingoPop 2.0 — aplicación unificada

La pantalla de inicio de la app es el videojuego. No existe una navegación separada Academia/World. Las 90 lecciones existentes aparecen al conversar con NPC durante las misiones; se incluyen al instalar la app.

## Compilación real
- Instala Node.js >=22 y dependencias con `npm install`.
- Ejecuta `npm run sync` para generar `www` y sincronizar Android/iOS.
- Si es un proyecto nuevo sin carpetas nativas, ejecuta `npx cap add android` y `npx cap add ios` (este último en macOS).
- Android Studio: `npm run android:open`; Xcode: `npm run ios:open`.
- Firmar, probar en dispositivos y revisar políticas antes de distribuir.

## Limitaciones
- Los assets estilizados del entorno 3D se generan mediante geometría WebGL, no son modelos ilustrados externos de la referencia comercial.
- Hay un respaldo Canvas2D cuando WebGL no está disponible.
- El progreso se guarda localmente, sin sincronización entre dispositivos.
- La comunicación no es una conversación abierta con IA; se basa en lecciones y respuestas guiadas.
- Las capturas para tienda deben obtenerse de las compilaciones nativas reales y no de maquetas anteriores.
