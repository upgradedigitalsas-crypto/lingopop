import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const index=read('index.html'), courses=read('public/courses.js'), app=read('public/app.js');
for(const a of ['/styles.css','/app.js','/courses.js','/manifest.webmanifest','/icons/icon-192.png']){
  const path = new URL('public'+a,root);
  if(!fs.existsSync(path)) throw Error('Falta '+a);
}
for(const s of ['data-lang="en"','data-lang="fr"','data-lang="pt"'])if(!index.includes(s))throw Error('Selector faltante '+s);
if(!courses.includes('window.COURSES'))throw Error('No están los cursos');
if(!app.includes('lingua30_multilingue_v1'))throw Error('Falta compatibilidad con avance previo');
console.log('Validación estática OK: contenido 3 idiomas, assets, progreso.');
