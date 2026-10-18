# Compilar app de LingoPop

La carpeta `mobile/` contiene el proyecto Capacitor de LingoPop 3.0.

```bash
cd mobile
npm install
npx cap add android # primera vez
npx cap add ios     # requiere macOS/Xcode
npm run build
npx cap sync
npx cap open android
npx cap open ios
```

Verifica scripts de `package.json` antes de ejecutar los comandos. Para publicar se necesitan firma, cuentas de desarrollador, pruebas y revisiones de Google/Apple.
