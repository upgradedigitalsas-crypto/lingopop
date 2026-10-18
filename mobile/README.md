# LingoPop 3.0 · Android / iOS (fuentes)

Mismo HTML, CSS, JS, misiones y progreso que la PWA LingoPop 3.0; pantalla principal narrativa integrada. Para generar proyectos nativos se requiere Node, npm, Android Studio y/o Xcode.

1. `npm install`
2. `npm run build`
3. `npx cap add android` / `npx cap add ios` (solo la primera vez)
4. `npx cap sync` y abrir en Android Studio / Xcode.

Este zip **no** contiene binarios `.aab`/`.ipa`, certificados ni archivos de firma. No hay publicación automática en las tiendas. La política de privacidad y los requisitos para apps orientadas a menores requieren revisión y aprobación antes del envío. El renderizado WebGL y el uso offline deben probarse en dispositivos reales.
