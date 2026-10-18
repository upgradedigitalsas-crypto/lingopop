# LingoPop — Lista de publicación

## Estado de este paquete

✅ Web educativa completa incluida y lista para generar proyectos nativos con Capacitor 8.
✅ Imágenes/recursos offline incluidos en `public/`.
✅ Configuración base Capacitor, Vite, módulo de capacidades nativas y verificación estática.
✅ Iconos y pieza gráfica Google Play.
⚠️ Proyecto Android/iOS nativo aún sin generar: requiere instalar dependencias con conexión a npm, Android Studio y Xcode.
⚠️ AAB/IPA firmados **NO** generados.
⚠️ Faltan publicar/validar política de privacidad, datos legales, contenidos de las fichas, screenshots en dispositivo real, avisos, auditoría de privacidad y pruebas.
⚠️ No se ha solicitado revisión ni publicación en Google Play o App Store.

## 1. Cuenta y nombre (antes de compilar)

- Google Play Console: https://play.google.com/console (25 USD pago único).
- Apple Developer: https://developer.apple.com/programs/enroll/ (99 USD/anuales).
- Verificar que `LingoPop` se pueda usar comercialmente y que no infrinja marcas ajenas.
- Confirmar titular legal, email de soporte, país, teléfono y datos de verificación empresarial.
- Confirmar Bundle Identifier / Package name ANTES de la primera carga: propuesta `co.upgrade.lingopop` en `capacitor.config.ts`. Se recomienda **no cambiarlo después de publicar**.

## 2. Generación local desde computador con Internet

Prerequisitos: Node 22+, Android Studio actualizado con SDK API 36; para iOS macOS con Xcode 26+ y Apple Developer activo.

```bash
npm install
npm run check
npm run build
npm run android:init
npm run ios:init
npm run sync
npm run android:open
npm run ios:open
```

Si Android o iOS ya existen, NO vuelvas a ejecutar `cap add`; utiliza `npm run sync` para actualizar recursos.

## 3. Android: Google Play

1. En Android Studio abrir proyecto y revisar `compileSdk` y `targetSdk` en API 36 (Capacitor 8 genera base compatible; verificar antes de generar bundle).
2. Probar simulador y al menos un teléfono Android real: audio, cambio de idioma, cuestionario, tarjetas, export/import y recordatorios con permisos.
3. Generar y comprobar el icono con `npm run assets:android`, y luego Android App Bundle (AAB) **firmado**; mantener keystore y contraseñas fuera del repositorio.
4. Crear ficha de tienda, completar cuestionario de clasificación, audiencia, seguridad de los datos, política de privacidad HTTPS y capturas originales.
5. Si Play Console es una cuenta personal nueva de fecha posterior al 13 nov. de 2023, realizar prueba cerrada con al menos 12 testers continuos durante 14 días y solicitar acceso a producción.
6. Enviar la versión AAB a revisión y esperar aprobación.

## 4. iOS: App Store

1. En Xcode asignar cuenta del equipo, Bundle ID y firma automática; probar en simulador y iPhone físico.
2. Validar aprobación App Store 4.2 (funcionalidad que exceda un simple empaquetado web). Las capacidades haptics, recordatorios y compartir ayudan, pero **no garantizan aprobación**. Se recomienda antes de enviar implementar más experiencia nativa y eliminar funciones no soportadas como dictado en WKWebView si falla.
3. Verificar permisos y claves Info.plist para cualquier grabación o reconocimiento de voz en dispositivos. No solicitar permisos que no se usen realmente.
4. Archive → Distribute App en Xcode, subir a App Store Connect, crear versión con capturas iPhone y metadatos, preguntas de privacidad y política pública.
5. Enviar para revisión; pueden solicitar cambios o rechazar.

## 5. Privacidad

- El `public/privacidad.html` es un **BORRADOR QUE NO DEBE PUBLICARSE** sin contacto legal y auditoría.
- Google Play y App Store requieren política de privacidad pública; Google también enlace dentro de la app.
- La app guarda progreso en almacenamiento local de su propio contenedor; **no migra automáticamente** desde la PWA del navegador. Exportar JSON desde PWA e importarlo en nativa.
- El reconocimiento de voz web puede no funcionar en WebView de iOS/Android y requerir permisos/código específico. Verificar antes de lanzar.
- El audio depende de las voces instaladas y puede necesitar descarga previa.

## 6. Referencias oficiales

- Capacitor: https://capacitorjs.com/docs/getting-started
- Capacitor 8 y SDK 36: https://capacitorjs.com/docs/updating/8-0
- Requisitos Google API: https://developer.android.com/google/play/requirements/target-sdk
- Pruebas cerradas: https://support.google.com/googleplay/android-developer/answer/14151465?hl=es
- Privacidad Play: https://support.google.com/googleplay/android-developer/answer/10144311
- Apple 4.2: https://developer.apple.com/app-store/review/guidelines/
- Apple Privacy: https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy
