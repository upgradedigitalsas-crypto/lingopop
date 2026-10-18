# LingoPop — Android + iOS · Capacitor 8

Este es un **proyecto fuente preparatorio para tiendas**, NO un APK/AAB/IPA firmado ni una publicación.

Incluye los tres cursos y assets; al compilar, los recursos web se insertan localmente en cada app nativa. No usa `server.url` apuntando a Vercel.

## Cómo arrancar

```bash
npm install
npm run check
npm run build
npm run android:init
npm run ios:init
npm run sync
npm run assets:android
npm run assets:ios
```

- Android Studio: `npm run android:open`
- Xcode/macOS: `npm run ios:open`

El bundle ID propuesto, no definitivo, es `co.upgrade.lingopop`.

Abre `docs/CHECKLIST_DE_PUBLICACION.md` antes de firmar o enviar a revisión.

La carpeta `public/` se copia al build, y `native-client.js` añade haptics, compartir y recordatorio diario **opcional** a las 20:00. En el navegador, el botón de instalación mantiene su funcionamiento original si se reutiliza como PWA.

La política de privacidad es un borrador con campos por completar. Actualizarla y publicarla bajo un URL HTTPS estable antes de solicitar revisión.

Los íconos y splash screens nativos se generan desde `assets/logo.png` mediante `@capacitor/assets` después de crear los proyectos.

## Versión 1.1 — Identidad y juego

Los tres idiomas mantienen el mismo almacenamiento local y los avances previos. Se añade XP (50 por día nuevo + 10 por evaluación perfecta), racha basada en fechas de lecciones aprobadas, niveles (300 XP por nivel), insignias y celebración visual. No hay IA conversacional incluida: requiere backend, modelo y política de datos propios.

La interfaz usa profesora oficial, ilustraciones y navegación inferior responsive; `public/` comparte la misma lógica con la PWA web. La captura publicitaria `store-assets/promocional-lingopop-profesora.jpg` no sustituye screenshots reales de la app.

**Los binarios firmados para tiendas y la publicación de App Store / Play Store aún están pendientes** de herramientas nativas, firma, revisión y cuentas habilitadas.

### Previews v1.1
Las imágenes de `store-assets/previews-web/` son capturas funcionales del prototipo **web móvil** y sirven para revisar diseño. Antes de subir capturas oficiales a Play Store o App Store, generar capturas desde los proyectos Android e iOS reales con las resoluciones exigidas.
