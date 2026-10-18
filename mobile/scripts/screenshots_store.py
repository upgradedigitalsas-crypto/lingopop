from pathlib import Path
from base64 import b64encode
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
pub=root/'public'
html=(root/'index.html').read_text()
html=html.replace('<link rel="stylesheet" href="/styles.css" />','<style>'+ (pub/'styles.css').read_text()+'</style>')
html=html.replace('<script src="/courses.js"></script>','').replace('<script src="/app.js" defer></script>','')
html=html.replace('<script type="module" src="/native-client.js"></script>','')
for path in ['iconography','icons']:
 for f in (pub/path).iterdir():
  mime='image/webp' if f.suffix=='.webp' else 'image/png'
  dat='data:'+mime+';base64,'+b64encode(f.read_bytes()).decode()
  html=html.replace('"/'+path+'/'+f.name+'"','"'+dat+'"')
configs=[('ios',420,912,3),('android',360,800,3)]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for family,w,h,dpr in configs:
  page=browser.new_page(viewport={'width':w,'height':h},device_scale_factor=dpr,is_mobile=True,has_touch=True)
  errs=[]
  page.on('pageerror',lambda e:errs.append(str(e)))
  page.set_content(html,wait_until='load',timeout=30000)
  page.add_script_tag(content=(pub/'courses.js').read_text())
  page.add_script_tag(content=(pub/'app.js').read_text())
  page.wait_for_selector('#hero-title')
  page.wait_for_timeout(700)
  out=root/'store-assets'/family
  out.mkdir(exist_ok=True)
  page.screenshot(path=str(out/'01-inicio.png'))
  page.locator('button[data-lang="fr"]').click()
  page.locator('button[data-tab="quiz"]').click()
  page.locator('.study-card').scroll_into_view_if_needed()
  page.wait_for_timeout(400)
  page.screenshot(path=str(out/'02-evaluacion-frances.png'))
  page.locator('button[data-lang="en"]').click()
  page.locator('button[data-tab="path"]').click()
  page.locator('.study-card').scroll_into_view_if_needed()
  page.wait_for_timeout(400)
  page.screenshot(path=str(out/'03-ruta-ingles.png'))
  assert not errs,(family,errs)
  print('screenshots',family,'size',w*dpr,'x',h*dpr,'JS errors',len(errs))
  page.close()
 browser.close()
