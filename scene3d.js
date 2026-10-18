/* LingoPop · Narrative mini-city 3D renderer with faceted architectural meshes, vegetation, lighting and an isometric camera. All geometry runs in bundled WebGL. */
(function(){'use strict';
const canvas=document.getElementById('game');
let gl=canvas.getContext('webgl',{alpha:true,antialias:true,preserveDrawingBuffer:false,depth:true});
if(!gl){ // Accessible Canvas2D fallback for phones and browsers with WebGL disabled.
 const ctx=canvas.getContext('2d');let phase=0,S=10,offX=0,offY=0,W=0,H=0;
 function project(x,y,z){return {x:W/2+(x-z-offX)*S*.71,y:H*.57+(x+z-offY)*S*.34-y*S*.95,visible:true}}
 function face(pts,c){ctx.fillStyle=c;ctx.beginPath();pts.forEach((p,i)=>{const q=project(...p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y)});ctx.closePath();ctx.fill()}
 function isoBox(x,z,w,d,h,c,roof){const b=[[x-w/2,0,z-d/2],[x+w/2,0,z-d/2],[x+w/2,0,z+d/2],[x-w/2,0,z+d/2]],t=b.map(p=>[p[0],h,p[2]]);face([b[1],b[2],t[2],t[1]],c[1]);face([b[2],b[3],t[3],t[2]],c[2]);face([t[0],t[1],t[2],t[3]],c[0]);if(roof){face([t[0],t[1],[x,h+1.4,z],t[0]],roof);face([t[3],t[2],[x,h+1.4,z]],roof)}return t}
 function ellipse(x,z,rx,ry,c){let q=project(x,0,z);ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(q.x,q.y,rx*S,ry*S,0,0,Math.PI*2);ctx.fill()}
 function person(x,z,coat,hat){ellipse(x,z,.44,.20,'#879e8999');let p=project(x,0,z);ctx.save();ctx.translate(p.x,p.y);ctx.fillStyle='#334d76';ctx.fillRect(-S*.18,-S*.42,S*.13,S*.45);ctx.fillRect(S*.07,-S*.42,S*.13,S*.45);ctx.fillStyle=coat;ctx.beginPath();ctx.ellipse(0,-S*.92,S*.43,S*.59,0,0,7);ctx.fill();ctx.fillStyle='#f3bfa2';ctx.beginPath();ctx.ellipse(0,-S*1.65,S*.4,S*.46,0,0,7);ctx.fill();ctx.fillStyle=hat||'#633b2a';ctx.beginPath();ctx.ellipse(0,-S*2.03,S*.43,S*.21,0,0,7);ctx.fill();ctx.fillStyle='#322d31';for(let n of [-1,1]){ctx.beginPath();ctx.arc(n*S*.15,-S*1.68,S*.05,0,7);ctx.fill()}ctx.restore()}
 function building(x,z,w,d,h,colors,roof,name){isoBox(x,z,w,d,h,colors,roof);let p=project(x,h*.48,z+d/2+.01);ctx.fillStyle='#f6f9ff';ctx.fillRect(p.x-S*1.3,p.y-S*.5,S*2.6,S*.95);ctx.fillStyle='#72c9d8';ctx.fillRect(p.x-S*1.08,p.y-S*.32,S*2.16,S*.55);// Canvas fallback also keeps a rich facade, avoiding blank primitive buildings.
  for(let floor=0;floor<2;floor++)for(let col=-1;col<=1;col++){
   let wp=project(x+col*(w*.25),h*(.52+floor*.17),z+d/2+.05);
   ctx.fillStyle='#fff5df';ctx.fillRect(wp.x-S*.36,wp.y-S*.43,S*.72,S*.86);
   ctx.fillStyle='#83bbd2';ctx.fillRect(wp.x-S*.28,wp.y-S*.35,S*.56,S*.70);
   ctx.fillStyle='#fdf8e9';ctx.fillRect(wp.x-S*.025,wp.y-S*.35,S*.05,S*.70);
   ctx.fillStyle='#87a6ad';ctx.fillRect(wp.x-S*.68,wp.y-S*.36,S*.20,S*.74);
   ctx.fillRect(wp.x+S*.48,wp.y-S*.36,S*.20,S*.74);
  }
  let aw=project(x,2.65,z+d/2+1.0);for(let i=-5;i<=5;i++){ctx.fillStyle=i%2?'#fff0dc':'#f08399';ctx.fillRect(aw.x+i*S*.59,aw.y-S*.11,S*.60,S*.48)}
  let a=project(x,h*.21,z+d/2+.2);ctx.fillStyle='#5289a8';ctx.fillRect(a.x-S*.38,a.y-S*.55,S*.75,S*1.4);ctx.fillStyle='#fff3d6';ctx.fillRect(p.x-S*2,p.y-S*1.1,S*4,S*.36);if(name){ctx.font=`900 ${Math.max(9,S*.72)}px system-ui`;ctx.textAlign='center';ctx.fillStyle='#33506f';ctx.fillText(name,p.x,p.y-S*1.2)}}
 function tree(x,z,r){let p=project(x,0,z);ctx.fillStyle='#79573a';ctx.fillRect(p.x-S*.11,p.y-S*2,S*.22,S*2);ctx.fillStyle=['#5fce7e','#8fd875','#4baa71'][Math.abs(Math.round(x+z))%3];for(let [dx,dy,radius] of [[0,-2.5,1.1],[-.7,-2,.65],[.7,-2,.7]]){ctx.beginPath();ctx.arc(p.x+dx*S,p.y+dy*S,radius*r*S,0,Math.PI*2);ctx.fill()}}
 function render(lang,player,style,t){W=canvas.clientWidth;H=canvas.clientHeight;let dpr=Math.min(2,devicePixelRatio||1);if(canvas.width!==Math.round(W*dpr)||canvas.height!==Math.round(H*dpr)){canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr)}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);S=W>800?Math.min(W/89,H/60):Math.min(W/69,H/54);offX=player.x*.15-player.z*.15;offY=player.x*.15+player.z*.15;
 isoBox(0,0,95,85,.01,['#a2d88c','#76be70','#79bc7e']);isoBox(0,2,84,9,.08,['#c6b7a2','#b5a28d','#b5a28d']);isoBox(0,0,12,70,.09,['#c6b7a2','#b5a28d','#b5a28d']);isoBox(0,0,30,26,.15,['#efd9b7','#d3c19f','#d5bc9c']);ellipse(0,-1,3.0,1.0,'#88c5da');let f=project(0,0,-1);ctx.fillStyle='#d8f4ff';ctx.beginPath();ctx.arc(f.x,f.y-S*1.5,S*.45,0,7);ctx.fill();
 let locations=[[-20,-13,12,9,7,['#ffd8a2','#d29a6c','#ceaa8a'],'#6991bc',lang==='fr'?'CAFÉ':lang==='en'?'TEA HOUSE':'CAFÉ'],[19,-12,12,10,7.5,['#fcd0dd','#db98ac','#d69eae'],'#9177c4',lang==='fr'?'FLEURS':lang==='en'?'FLOWERS':'FLORES'],[-26,21,13,9,9,['#c4cee9','#95aed5','#9aaed5'],'#5278b3','ESTACIÓN'],[25,21,12,9,9,['#aee1da','#85c2b2','#88c1bb'],'#81a0c7','LOJA'],[0,-29,17,9,11,['#ecd7a8','#bda67d','#c1aa7e'],'#72adc3','MUSEO']];let items=locations.map(x=>({depth:x[0]+x[1],f:()=>building(...x)}));for(let [x,z] of [[-20,3],[20,3],[-20,20],[20,20],[-29,9],[29,9],[-4,17],[5,-17],[-29,-19],[29,-17],[-37,-8],[37,-5]])items.push({depth:x+z,f:()=>tree(x,z,1)});
 for(let [x,z,c] of [[17,-6,'#e98ba2'],[-17,-6,'#554f72'],[-2,7,'#ffd35b'],[-26,16,'#61aac9'],[25,16,'#efb766'],[player.x,player.z,['#59b7e7','#f09b98','#f3c76b'][style]||'#59b7e7']])items.push({depth:x+z+2,f:()=>person(x,z,c)});items.sort((a,b)=>a.depth-b.depth).forEach(x=>x.f());}
 window.City3D={render,project,error:null,fallback:true,getLabels:()=>[],scenes:{fr:'Paris Pop',en:'London Pop',pt:'Rio Pop'}};return}
const vs=`attribute vec3 pos;attribute vec3 color;attribute vec3 normal;uniform mat4 vp;uniform vec3 sun;varying vec3 col;varying float fog;void main(){vec4 p=vp*vec4(pos,1.0);gl_Position=p;float l=max(0.0,dot(normalize(normal),normalize(sun)));col=color*(0.63+0.40*l);fog=clamp((pos.y+4.0)/30.0,0.0,1.0);}`;
const fs=`precision mediump float;varying vec3 col;varying float fog;void main(){gl_FragColor=vec4(mix(col,col*vec3(1.055,1.05,1.08),fog*.2),1.0);}`;
function sh(type,source){let s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}
const program=gl.createProgram();gl.attachShader(program,sh(gl.VERTEX_SHADER,vs));gl.attachShader(program,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);
const aPos=gl.getAttribLocation(program,'pos'),aColor=gl.getAttribLocation(program,'color'),aNormal=gl.getAttribLocation(program,'normal'),uVP=gl.getUniformLocation(program,'vp'),uSun=gl.getUniformLocation(program,'sun');gl.uniform3f(uSun,-.35,.94,.68);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);
const buf=gl.createBuffer(),stride=9;let staticVertices=new Float32Array(),dynamicVertices=new Float32Array(),verts=[];
function hex(v){if(Array.isArray(v))return v;v=v.replace('#','');return[0,2,4].map(i=>parseInt(v.substring(i,i+2),16)/255)}
function triangle(a,b,c,color){let n=cross(sub(b,a),sub(c,a)),mag=Math.hypot(...n)||1;n=n.map(x=>x/mag);let h=hex(color);for(let p of [a,b,c])verts.push(...p,...h,...n)}
function quad(a,b,c,d,color){triangle(a,b,c,color);triangle(a,c,d,color)}
function box(x,y,z,w,h,d,c){let a=x-w/2,b=x+w/2,e=y-h/2,f=y+h/2,m=z-d/2,n=z+d/2;let colors=Array.isArray(c)&&typeof c[0]==='string'?c:[c,c,c,c,c,c];quad([a,f,m],[b,f,m],[b,f,n],[a,f,n],colors[0]);quad([a,e,n],[b,e,n],[b,e,m],[a,e,m],colors[1]);quad([a,e,n],[b,e,n],[b,f,n],[a,f,n],colors[2]);quad([b,e,m],[a,e,m],[a,f,m],[b,f,m],colors[3]);quad([b,e,n],[b,e,m],[b,f,m],[b,f,n],colors[4]);quad([a,e,m],[a,e,n],[a,f,n],[a,f,m],colors[5])}
function cylinder(x,y,z,rad,h,c,segments=12,topRadius=rad){let b=y-h/2,t=y+h/2;for(let i=0;i<segments;i++){let a=i/segments*Math.PI*2,n=(i+1)/segments*Math.PI*2,v=[Math.cos(a),Math.sin(a)],q=[Math.cos(n),Math.sin(n)];quad([x+v[0]*rad,b,z+v[1]*rad],[x+q[0]*rad,b,z+q[1]*rad],[x+q[0]*topRadius,t,z+q[1]*topRadius],[x+v[0]*topRadius,t,z+v[1]*topRadius],c);triangle([x,t,z],[x+v[0]*topRadius,t,z+v[1]*topRadius],[x+q[0]*topRadius,t,z+q[1]*topRadius],c)}}
function sphere(x,y,z,r,c,lat=6,lon=10,scale=[1,1,1]){for(let i=0;i<lat;i++){let p=i*Math.PI/lat,q=(i+1)*Math.PI/lat;for(let j=0;j<lon;j++){let a=j*2*Math.PI/lon,b=(j+1)*2*Math.PI/lon;const v=(t,u)=>[x+Math.sin(t)*Math.cos(u)*r*scale[0],y+Math.cos(t)*r*scale[1],z+Math.sin(t)*Math.sin(u)*r*scale[2]];quad(v(p,a),v(q,a),v(q,b),v(p,b),c)}}}
function disk(x,y,z,rx,rz,color){let segments=18;for(let i=0;i<segments;i++){let a=i*2*Math.PI/segments,b=(i+1)*2*Math.PI/segments;triangle([x,y,z],[x+Math.cos(a)*rx,y,z+Math.sin(a)*rz],[x+Math.cos(b)*rx,y,z+Math.sin(b)*rz],color)}}
function wedgeRoof(x,y,z,w,d,h,color){let a=x-w/2,b=x+w/2,f=z-d/2,g=z+d/2;quad([a,y,f],[b,y,f],[b,y+h,z],[a,y+h,z],color);quad([a,y+h,z],[b,y+h,z],[b,y,g],[a,y,g],color);triangle([a,y,f],[a,y,g],[a,y+h,z],color);triangle([b,y,g],[b,y,f],[b,y+h,z],color)}
function tree(x,z,s=1,type=0){cylinder(x,1.05*s,z,.15*s,2.1*s,'#9d6045',9);const green=['#6ed383','#42bb77','#8dde66','#f1a0a8','#a2d875'][type%5];sphere(x,2.7*s,z,1.06*s,green,5,9,[1,1.05,1]);sphere(x-.56*s,2.22*s,z+.28*s,.73*s,green,5,9);sphere(x+.52*s,2.25*s,z-.21*s,.76*s,green,5,9)}
function flower(x,z,c){cylinder(x,.4,z,.025,.75,'#409750',6);sphere(x,.83,z,.16,c,4,7);sphere(x+.11,.82,z,.07,'#fbe7a8',4,7)}
function bench(x,z){box(x,.4,z,2.5,.2,.7,'#bc7f54');box(x,.85,z-.34,2.5,.82,.17,'#bc7f54');for(let i of [-.95,.95])box(x+i,.2,z,.16,.4,.58,'#56768a')}
function lamp(x,z){cylinder(x,1.9,z,.09,3.8,'#466075',9);sphere(x,3.9,z,.37,'#fff4c9',6,11);cylinder(x,4.33,z,.13,.45,'#506a7b',8)}
function awning(x,z,width){for(let i=0;i<7;i++){let w=width/7;box(x-width/2+w*(i+.5),2.55,z,w,.19,1.3,i%2?'#fff3d6':'#e8697b')}}
function building(x,z,w,d,h,wall,roof,style='shop'){
 box(x,h/2+.2,z,w,h,d,[wall,wall,wall,wall,wall,wall]);box(x,h+.33,z,w+.35,.65,d+.35,'#fff7e7');wedgeRoof(x,h+.6,z,w+.68,d+.7,1.8,roof);
 for(let side of [-1,1])for(let i=0;i<2;i++){let xx=x+(i?1:-1)*w*.25;let zz=z+side*d/2+.055;box(xx,h*.70,zz,1.02,1.24,.11,'#f9f1db');box(xx,h*.70,zz+side*.1,.70,.91,.06,'#77c7e8');box(xx,h*.70,zz+side*.17,.08,.91,.03,'#fff5d7');box(xx,h*.70,zz+side*.17,.70,.08,.03,'#fff5d7')}
 for(let side of [-1,1]){let zz=z+side*(d/2+.08);box(x,1.15,zz,1.7,2.3,.14,style==='shop'?'#64b7cf':'#9b729c');box(x+.5,1.05,zz+side*.14,.16,.16,.08,'#ffef87');awning(x,zz+side*.6,w*.90)}
 if(style==='cafe'){for(let i=0;i<3;i++){const tx=x-3.3+i*3.1,tz=z+d/2+4;box(tx,.62,tz,1.45,.13,1.45,'#e3b07b');cylinder(tx,.29,tz,.10,.6,'#9b6d55');cylinder(tx,1.4,tz,.09,1.9,'#8b806a');cylinder(tx,2.3,tz,1.22,.14,i%2?'#f4dd8e':'#f19086',12,0)}}
 facadeDetails(x,z,w,d,h,roof,style);
 if(style==='flowers'){for(let j=0;j<4;j++){let a=x-2.6+j*1.65;box(a,.36,z+d/2+2.6,1.25,.7,1.12,'#b88768');for(let i=0;i<4;i++)flower(a+Math.sin(i*2)*.3,z+d/2+2.6+(i-1.5)*.2,['#f07794','#f8da66','#c68adf','#fff8e1'][(j+i)%4])}}
}
// Architectural asset mesh library: every facade, dormer, balustrade and roof is
// modeled as real 3D triangles in the renderer, rather than background artwork.
function dormer(x,y,z,roof='#708eb1'){
 box(x,y+.65,z,1.65,1.5,1.3,'#fff4e8');box(x,y+.7,z+.71,.9,.98,.12,'#6aa9c6');
 for(let dx of [-.45,.45])box(x+dx,y+.7,z+.79,.10,1.05,.08,'#fff7e2');
 box(x,y+1.3,z+.08,1.92,.13,1.6,'#f5eed9');wedgeRoof(x,y+1.38,z,2.06,1.8,.72,roof)
}
function shutters(x,y,z,c='#6ba8a3'){
 for(let d of [-.8,.8]){box(x+d,y,z+.20,.42,1.32,.12,c);for(let i=-2;i<=2;i++)box(x+d,y+i*.18,z+.29,.36,.045,.035,'#d6eee4')}
 box(x,y-.7,z+.23,2.35,.10,.27,'#f9e5c4');
}
function planter(x,z,c){box(x,.29,z,1.38,.55,.8,'#c88a63');for(let i=0;i<4;i++){const xx=x-.46+i*.31;flower(xx,z,['#f8cd65','#ea9bb8','#a887eb','#fff6d8'][(i+Math.floor(x))&3])}}
function cityCobblestones(){
 // 3D rectangular pavers add environmental depth; limited counts for mobile GPUs.
 const colors=['#efe0c8','#eadac2','#dccbb2','#f7e7d0','#e0d0b6'];
 for(let i=-17;i<=17;i++)for(let j=-6;j<=6;j++){
  let x=i*1.9+(j%2)*.9,z=j*1.75+1;
  // Preserve the central fountain opening and make the stone texture a true mesh.
  if(Math.hypot(x,z+1)<4.5)continue;
  box(x,.092,z,1.78,.045,1.62,colors[Math.abs(i*5+j*7)%5]);
 }
}
function storytellingLandmarks(){
 // Small clock landmark and Paris-styled iron lattice sculpture.
 box(35,0.27,-27,6,.55,6,'#f6ead6');
 for(let i=0;i<4;i++){let a=i*Math.PI/2,cx=35+2.3*Math.cos(a),cz=-27+2.3*Math.sin(a);box(cx,1.8,cz,.25,2.9,.25,'#527e99')}
 cylinder(35,3.1,-27,1.75,.14,'#4d7897',18);sphere(35,3.25,-27,1.2,'#f2e2b5',6,12,[1,.15,1]);
 let towerX=-37,towerZ=-32;
 for(let level=0;level<4;level++){const bottom=level*3,wb=3.0-level*.7,wt=Math.max(.35,wb-.66);
  for(let sx of [-1,1])for(let sz of [-1,1]){
   const ax=towerX+sx*wb,az=towerZ+sz*wb,bx=towerX+sx*wt,bz=towerZ+sz*wt;
   let n=7;for(let i=0;i<n;i++){let a=i/n,b=(i+1)/n;
    cylinder(ax+(bx-ax)*a,bottom+(.5+i*(3/n)),az+(bz-az)*a,.095,.48,'#68788d',6)}
  }
  box(towerX,bottom+3,towerZ,wb*2.2,.21,wb*2.2,'#637f9b')
 }
 sphere(towerX,12.5,towerZ,.43,'#ffe7a2',5,10)
}
function facadeDetails(x,z,w,d,h,roof,style){
 let front=z+d/2+.20;
 // Different floors read as individual structures instead of primitive cubes.
 for(let floor=1;floor<=2;floor++){
  let y=2.8+floor*1.45;
  if(y>h-1.3)continue;
  for(let offset of [-w*.28,0,w*.28]){
   box(x+offset,y,front,1.12,1.35,.19,'#fff1df');
   box(x+offset,y,front+.115,.77,1.00,.13,'#78b8d0');
   box(x+offset,y,front+.19,.06,1.05,.12,'#fff6e8');
   box(x+offset,y,front+.2,.8,.065,.1,'#fff6e8');
   shutters(x+offset,y,front+.13,style==='flowers'?'#739db2':'#789d8d');
  }
 }
 box(x,h*.49,front+.45,w*.95,.16,.31,'#fdf3e3');
 // Little flower balcony with molded railings.
 if(style==='flowers'||style==='cafe'){
  box(x,h*.46,front+1.1,w*.52,.15,1.1,'#f8ebd5');
  for(let off=-w*.22;off<=w*.22;off+=.75)box(x+off,h*.46+.42,front+1.52,.07,.80,.07,'#536f7b');
  box(x,h*.46+.82,front+1.52,w*.48,.10,.13,'#536f7b');
  for(let off of [-1.5,0,1.5])planter(x+off,front+1.0,style==='flowers'?'#db949c':'#d7b26a');
 }
 // Brick chamfers and cornices.
 for(let k=0;k<4;k++)box(x,h*.20+k*.21,front+.22,w+.12,.065,.20,'#f9e6d2');
 // Distinctive mansard dormers for Parisian skyline.
 if(w>=11){for(let off of [-w*.23,w*.23])dormer(x+off,h+1.38,z+d*.11,roof)}
}
function plaza(){box(0,-.34,0,94,.7,78,'#8acb75');box(0,.005,1,78,.14,8,'#c4b7a3');box(0,.005,1,13,.14,69,'#c4b7a3');box(0,.007,1,29,.16,22,'#ead8b9');for(let n=-8;n<=8;n++){box(n*1.65,.1,1,0.025,.014,21,'#d3c19f')}for(let n=-6;n<=6;n++){box(0,.1,1+n*1.65,29,.014,.024,'#d3c19f')}
 cityCobblestones();storytellingLandmarks();cylinder(0,.38,-1,3.5,.65,'#d7eef1',20);cylinder(0,.71,-1,3.14,.18,'#60cde8',20);cylinder(0,1.1,-1,.52,.9,'#e7f6ee',14);cylinder(0,1.73,-1,1.43,.20,'#e9f3d6',16);cylinder(0,2.06,-1,.18,.55,'#72d1ef',10);sphere(0,2.35,-1,.3,'#91e8fd');
 for(let [x,z] of [[-20,3],[20,3],[-20,20],[20,20],[-29,9],[29,9],[-4,17],[5,-17],[-29,-19],[29,-17],[-37,-8],[37,-5]]) tree(x,z,.85+Math.abs(x%3)*.09,Math.abs(Math.round(x+z))%5);
 for(let [x,z] of [[-34,-20],[34,-20],[-33,23],[35,25],[17,5],[-19,-1]])for(let i=0;i<3;i++)flower(x+i*.33,z+.3*(i%2),['#f9cb71','#d48dd3','#fd9d9e'][i]);
 for(let [x,z] of [[-11,12],[11,12],[-9,-9],[10,-11]])bench(x,z);
 for(let [x,z] of [[-12,7],[12,7],[-12,-13],[12,-13],[28,1],[-28,1]])lamp(x,z);
 for(let x=-38;x<40;x+=10){sphere(x,.25,24,.49,'#f9d97c',5,7,[1,.6,1]);sphere(x,.25,-28,.49,'#ee97a3',5,7,[1,.6,1])}}
function stageBuildings(lang){const configs={fr:{a:'#f6c493',b:'#ffc4cf',c:'#c4b3e6',d:'#b2e0d7',e:'#f0db9f'},en:{a:'#e7b799',b:'#a2c5df',c:'#ffdbad',d:'#f8c2af',e:'#c8d1e7'},pt:{a:'#ffdb9c',b:'#faac9f',c:'#9cdec1',d:'#f0d0ed',e:'#a2b8e6'}};let t=configs[lang]||configs.fr;building(-20,-13,12,9,7,t.a,'#698ab9','cafe');building(19,-12,12,10,7.5,t.b,'#9989cf','flowers');building(-26,21,13,9,9,t.c,'#577eb7','shop');building(25,21,12,9,9,t.d,'#7f9cc7','shop');building(0,-29,17,9,11,t.e,'#669bb2','shop');for(let i=0;i<6;i++)flower(13+i*.95,0,'#f4b4bc')}
const cityNames={fr:['Café Bonjour','Fleurs de Camille','Gare Pop','La Boutique','Museo Pop'],en:['Tea House','Flower Market','Pop Station','The Boutique','City Museum'],pt:['Café do Rio','Flores Pop','Estação Pop','Loja Alegre','Museu Pop']};
const markers=[{id:'cafe',x:-17,z:-6,y:9},{id:'florist',x:18,z:-6,y:9},{id:'station',x:-26,z:17,y:11},{id:'shop',x:25,z:16,y:11},{id:'museum',x:0,z:-23,y:13}];
function rebuild(lang){verts=[];plaza();stageBuildings(lang);staticVertices=new Float32Array(verts);window.City3D.labels=markers.map((m,i)=>({...m,text:cityNames[lang][i]}))}
function human(x,z,skin,coat,hair= '#60321c',accessory=0,walking=false,t=0){let s=walking?Math.sin(t*9)*.11:Math.sin(t*1.5)*.04;disk(x,.13,z,.65,.45,'#5d855d');cylinder(x,.65+s,z,.55,1.1,coat,9,.42);sphere(x,1.67+s,z,.46,skin,5,10,[1,1.04,1]);sphere(x,1.98+s,z,.46,hair,5,10,[1,.52,1]);sphere(x-.15,1.66+s,z+.41,.055,'#222433',3,5);sphere(x+.15,1.66+s,z+.41,.055,'#222433',3,5);cylinder(x-.63,.92+s,z,.12,.83,coat,7,.13);cylinder(x+.63,.92+s,z,.12,.83,coat,7,.13);for(let j of [-.22,.22]){cylinder(x+j,.24+s*(j>0?1:-1),z,.17,.49,'#424779',7,.19)}if(accessory){box(x+.28,1.05+s,z-.48,.65,.65,.25,accessory===2?'#cfbd74':'#685bc5')}}
function oldMan(x,z,t){human(x,z,'#e7ad86','#554f72','#3c2c2a',0,false,t)}
function flowerGirl(x,z,t){human(x,z,'#f3c39e','#e98ba2','#70482e',0,false,t);cylinder(x,2.17,z,.53,.20,'#c15685',12)}
function avatarModel(x,z,style,t,moving){const skins=['#d79b74','#f4c1a0','#985c42'],coats=['#58b3e5','#ee918e','#f5c955'],hairs=['#30251e','#6e3921','#1d1d24'];human(x,z,skins[style]||skins[0],coats[style]||coats[0],hairs[style]||hairs[0],1,moving,t)}
function crowd(t){for(let i=0;i<7;i++){let r=8+i*.63,phase=t*(.12+.025*i)+i*.95;let x=Math.cos(phase)*r,z=Math.sin(phase)*r+6;human(x,z,['#f0b788','#d5a17c','#925b47'][i%3],['#d48cc0','#6693bf','#f6d17b','#81c8a3'][i%4],'#574631',0,true,t+i)}}
// Column-major math, self contained: perspective is orthographic with true WebGL depth and occlusion.
function lookAt(eye,target){let z=unit(sub(eye,target)),x=unit(cross([0,1,0],z)),y=cross(z,x);return [x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1]}
function ortho(l,r,b,t,n,f){return [2/(r-l),0,0,0,0,2/(t-b),0,0,0,0,-2/(f-n),0,-(r+l)/(r-l),-(t+b)/(t-b),-(f+n)/(f-n),1]}
function multiply(a,b){let o=new Array(16).fill(0);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o}
function sub(a,b){return a.map((v,i)=>v-b[i])}function cross(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}function dot(a,b){return a.reduce((n,v,i)=>n+v*b[i],0)}function unit(a){let m=Math.hypot(...a)||1;return a.map(v=>v/m)}
let currentVP,sceneLang='fr',lastWidth=0,lastHeight=0,focus=[0,0,0];
function resize(){let w=canvas.clientWidth,h=canvas.clientHeight,dpr=Math.min(2,devicePixelRatio||1);let W=Math.round(w*dpr),H=Math.round(h*dpr);if(W!==lastWidth||H!==lastHeight){lastWidth=W;lastHeight=H;canvas.width=W;canvas.height=H;gl.viewport(0,0,W,H)}return {w,h,aspect:w/h}}
function project(x,y,z){let a=currentVP;if(!a)return {x:0,y:0,visible:false};let X=a[0]*x+a[4]*y+a[8]*z+a[12],Y=a[1]*x+a[5]*y+a[9]*z+a[13],W=a[3]*x+a[7]*y+a[11]*z+a[15];return{x:(X/W*.5+.5)*canvas.clientWidth,y:(.5-Y/W*.5)*canvas.clientHeight,visible:X/W>-1.15&&X/W<1.15&&Y/W>-1.2&&Y/W<1.2}}
function draw(array,dynamic){if(!array.length)return;gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,array,dynamic?gl.DYNAMIC_DRAW:gl.STATIC_DRAW);const s=9*4;gl.enableVertexAttribArray(aPos);gl.enableVertexAttribArray(aColor);gl.enableVertexAttribArray(aNormal);gl.vertexAttribPointer(aPos,3,gl.FLOAT,false,s,0);gl.vertexAttribPointer(aColor,3,gl.FLOAT,false,s,3*4);gl.vertexAttribPointer(aNormal,3,gl.FLOAT,false,s,6*4);gl.drawArrays(gl.TRIANGLES,0,array.length/stride)}
let lastCamera=[0,0],lastTimestamp=0;
function render(lang,player,style,t,walking){const {aspect,w}=resize();if(sceneLang!==lang||staticVertices.length===0){sceneLang=lang;rebuild(lang)}let mobile=w<700;let pan=.14;lastCamera[0]+=(player.x*pan-lastCamera[0])*.045;lastCamera[1]+=(player.z*pan-lastCamera[1])*.045;
let center=[lastCamera[0],0,lastCamera[1]],eye=[center[0]+43,center[1]+52,center[2]+63],v=lookAt(eye,center);let vertSize=mobile?67:57,horSize=vertSize*aspect; if(!mobile&&horSize<62){horSize=62;vertSize=horSize/aspect}let p=ortho(-horSize/2,horSize/2,-vertSize/2,vertSize/2,.1,300);currentVP=multiply(p,v);gl.uniformMatrix4fv(uVP,false,new Float32Array(currentVP));gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);draw(staticVertices,false);
verts=[];const dt=t/1000;flowerGirl(17,-6,dt);oldMan(-17,-6,dt);human(-2,7,'#f3c298','#f2ca55','#603525',0,false,dt);human(-26,16,'#c99877','#5ea4bd','#573423',0,false,dt);human(25,16,'#bd8b74','#d99565','#463127',0,false,dt);crowd(dt);avatarModel(player.x,player.z,style,dt,walking);dynamicVertices=new Float32Array(verts);draw(dynamicVertices,true)}
window.City3D={render,project,getLabels:()=>window.City3D.labels||[],error:null,scenes:{fr:'Paris Pop',en:'London Pop',pt:'Rio Pop'}};
})();
