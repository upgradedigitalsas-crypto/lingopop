# LingoPop — academia multilingüe PWA

Web app sin dependencias: **portugués brasileño, inglés y francés**, con 30 días por idioma (90 lecciones, 450 expresiones). Explicaciones en español, evaluación de 5 preguntas por día (aprobación: 4/5), tarjetas, dictado de voz opcional, texto a voz, misiones escritas y progreso local independiente.

## Publicación en Vercel

1. Entra a [Vercel](https://vercel.com/new) con tu cuenta y crea un proyecto desde un repositorio Git que contenga **los archivos de esta carpeta en la raíz**. También puedes ejecutar `bash PUBLICAR_EN_VERCEL.sh` dentro de esta carpeta en el Terminal de macOS. El script pide autorización en Vercel y hace el despliegue con la CLI oficial.
2. Selecciona **Other** / sin framework, sin comando de compilación y directorio de salida `.` (raíz).
3. Publica. Vercel asignará una URL real `https://<tu-proyecto>.vercel.app`. La URL exacta se conoce después de un despliegue exitoso; no se incluye una URL ficticia.
4. En Android, abre la URL en Chrome y selecciona **Instalar app**. En iPhone, abre en Safari → Compartir → **Añadir a pantalla de inicio**.

## Ejecución local

Para probar en tu computador, dentro de esta carpeta ejecuta `python3 -m http.server 8080` y abre `http://localhost:8080`.

## Archivos clave

- `index.html`: vista de la academia.
- `styles.css`: estilo responsive (móvil y escritorio).
- `courses.js`: las 90 lecciones en tres idiomas.
- `app.js`: evaluaciones, progreso, audio, voz, importación y exportación.
- `manifest.webmanifest`: configuración de instalación.
- `sw.js`: cache offline para el contenido estático.
- `icons/`: íconos instalables de 192 y 512px.
- `vercel.json`: configuración de despliegue estático.

## Notas

- La instalación PWA necesita **HTTPS** o localhost. Abrir `index.html` como archivo desde el celular no da acceso completo a PWA/offline.
- El contenido está disponible sin conexión después de su primera descarga y precarga mediante el service worker. El audio usa voces disponibles en el dispositivo/navegador y algunas pueden necesitar Internet o descarga previa. La práctica con micrófono depende del navegador y puede requerir conexión.
- El progreso se guarda en `localStorage`, **no se sincroniza entre dispositivos**. Usa “Respaldar mis avances” para exportar/importar un JSON. El navegador puede borrar su almacenamiento.
- No incluye backend ni seguimiento de usuarios, y no pretende garantizar fluidez completa en 30 días.
