(() => {
  'use strict';
  const main = document.querySelector('main');
  const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const button = (action, label, glyph) => `<button type="button" class="icon-button" data-ink="${action}" title="${label}" aria-label="${label}">${icon(glyph)}</button>`;
  const launcher = document.createElement('button');
  launcher.id = 'annotationToggle';
  launcher.className = 'icon-button';
  launcher.type = 'button';
  launcher.title = 'Annotate this page';
  launcher.setAttribute('aria-label', launcher.title);
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-controls', 'annotationToolbar');
  launcher.innerHTML = icon('pencil-line');
  document.querySelector('.header-actions').prepend(launcher);
  const toolbar = document.createElement('section');
  toolbar.id = 'annotationToolbar';
  toolbar.setAttribute('aria-label', 'Page annotations');
  toolbar.hidden = true;
  toolbar.innerHTML = `<div class="ink-tools" role="group" aria-label="Annotation tool">
    ${button('browse','Browse page','mouse-pointer-2')}${button('pen','Pen','pen-line')}${button('highlight','Highlighter','highlighter')}${button('erase','Erase whole stroke','eraser')}
    <span class="ink-divider"></span>${button('undo','Undo','undo-2')}${button('redo','Redo','redo-2')}${button('clear','Clear visible annotations (Esc; undo available)','trash-2')}${button('close','Close annotation toolbar','x')}
    </div><div class="ink-options"><div class="ink-colors" role="group" aria-label="Ink color">
    ${[['#d72645','Red'],['#1266c4','Blue'],['#087f5b','Green'],['#f5ca28','Yellow'],['#202020','Black'],['#ffffff','White']].map(([color,name])=>`<button type="button" data-ink-color="${color}" style="--swatch:${color}" aria-label="${name} ink" title="${name} ink" aria-pressed="false"></button>`).join('')}
    </div><label for="inkWidth">Width</label><input id="inkWidth" type="range" min="1" max="12" value="4" title="Stroke width"><output for="inkWidth">4</output></div>`;
  document.body.append(toolbar);
  const canvas = document.createElement('canvas');
  canvas.id = 'annotationCanvas';
  canvas.setAttribute('aria-hidden','true');
  document.body.append(canvas);
  const context = canvas.getContext('2d');
  const hitContext = document.createElement('canvas').getContext('2d');
  const storageKey = 'calapa-annotations-session-v1';
  let pages = {};
  const validStroke = s => s && ['pen','highlight'].includes(s.tool) && /^#[0-9a-f]{6}$/i.test(s.color) && Number.isFinite(s.width) && s.width > 0 && s.width <= 48 && Array.isArray(s.points) && s.points.length > 0 && s.points.every(p=>Array.isArray(p)&&p.length===3&&p.every(Number.isFinite));
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
    for (const [key, value] of Object.entries(saved || {})) if (Array.isArray(value) && value.every(validStroke)) pages[key] = value;
  } catch { /* A restricted browser can still use in-memory annotations. */ }
  let key = '', strokes = [], undo = [], redo = [], tool = 'browse', color = '#d72645', width = 4;
  let gesture = null, frame = 0, layoutDirty = true, surface = null, noticeTimer;
  const histories = new Map();
  const paths = new WeakMap();
  function announce(message) {
    const status = document.querySelector('#status');
    status.textContent = message;
    status.classList.add('visible');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(()=>status.classList.remove('visible'),4500);
  }
  function save() {
    pages[key] = strokes;
    try { sessionStorage.setItem(storageKey, JSON.stringify(pages)); }
    catch { announce('Marks are available until reload; this browser could not save this tab session.'); }
  }
  function updateControls() {
    toolbar.querySelectorAll('[data-ink]').forEach(el=>{
      if (['browse','pen','highlight','erase'].includes(el.dataset.ink)) el.setAttribute('aria-pressed',String(el.dataset.ink===tool));
    });
    toolbar.querySelector('[data-ink="undo"]').disabled = !undo.length;
    toolbar.querySelector('[data-ink="redo"]').disabled = !redo.length;
    toolbar.querySelector('[data-ink="clear"]').disabled = !strokes.length;
    toolbar.querySelectorAll('[data-ink-color]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.inkColor===color)));
    canvas.style.pointerEvents = tool==='browse' || toolbar.hidden ? 'none' : 'auto';
    canvas.style.cursor = tool==='erase' ? 'cell' : 'crosshair';
  }
  function selectTool(value) {
    tool = value;
    if (value==='highlight') color = '#f5ca28';
    if (value==='pen' && color==='#f5ca28') color = '#d72645';
    updateControls();
  }
  function hash(text) {
    let value = 2166136261;
    for (let i=0;i<text.length;i++) value = Math.imul(value ^ text.charCodeAt(i),16777619);
    return (value>>>0).toString(36);
  }
  function cancelGesture() {
    if (!gesture) return;
    if (gesture.before) strokes = gesture.before;
    gesture = null;
  }
  function checkLayout(rect) {
    if (!layoutDirty) return;
    layoutDirty = false;
    // Coordinates are reusable only for the same content, wrapping, and disclosure state.
    const details = [...main.querySelectorAll('details')].map(el=>Number(el.open)).join('');
    const next = `${location.pathname}|${hash(main.textContent)}|${Math.round(rect.width)}|${Math.round(rect.height)}|${getComputedStyle(main).fontSize}|${details}`;
    if (next===key) return;
    cancelGesture();
    const hadMarks = strokes.length > 0;
    if (key) histories.set(key,{undo,redo});
    key = next;
    canvas.dataset.layout = key;
    strokes = pages[key] || [];
    ({undo,redo} = histories.get(key) || {undo:[],redo:[]});
    if (hadMarks && !toolbar.hidden) announce('Layout changed. Earlier marks remain with their original layout.');
    updateControls();
  }
  function strokePath(stroke, complete=true) {
    if (complete && paths.has(stroke)) return paths.get(stroke);
    const outline = window.PerfectFreehand.getStroke(stroke.points,{
      size:stroke.width, thinning:stroke.tool==='highlight'?0:0.45,
      simulatePressure:!stroke.pen, smoothing:0.6, streamline:0.25, last:complete
    });
    const path = new Path2D();
    outline.forEach(([x,y],i)=>i ? path.lineTo(x,y) : path.moveTo(x,y));
    path.closePath();
    if (complete) paths.set(stroke,path);
    return path;
  }
  function paintStroke(stroke, complete=true) {
    context.globalAlpha = stroke.tool==='highlight'?0.28:1;
    context.fillStyle = stroke.color;
    context.fill(strokePath(stroke,complete));
  }
  function render() {
    frame = 0;
    const rect = main.getBoundingClientRect();
    checkLayout(rect);
    const top = Math.max(0,rect.top,document.querySelector('.topbar').getBoundingClientRect().bottom);
    const height = Math.max(0,Math.min(innerHeight,rect.bottom)-top);
    surface = {rect,top,height};
    canvas.style.left = rect.left+'px';
    canvas.style.top = top+'px';
    canvas.style.width = rect.width+'px';
    canvas.style.height = height+'px';
    const ratio = window.devicePixelRatio || 1;
    const w = Math.round(rect.width*ratio), h = Math.round(height*ratio);
    if (canvas.width!==w || canvas.height!==h) { canvas.width=w;canvas.height=h; }
    context.setTransform(1,0,0,1,0,0);
    context.clearRect(0,0,canvas.width,canvas.height);
    context.setTransform(ratio,0,0,ratio,0,(rect.top-top)*ratio);
    for (const stroke of strokes) paintStroke(stroke);
    if (gesture?.stroke) paintStroke(gesture.stroke,false);
    context.globalAlpha = 1;
  }
  function schedule() { if (!frame) frame=requestAnimationFrame(render); }
  function changedLayout() { layoutDirty=true;schedule(); }
  function point(event) {
    const rect = main.getBoundingClientRect();
    return [event.clientX-rect.left,event.clientY-rect.top,event.pressure>0?event.pressure:0.5];
  }
  function eraseAt(p) {
    hitContext.lineWidth = 16;
    strokes = strokes.filter(stroke=>{
      const path = strokePath(stroke);
      return !hitContext.isPointInPath(path,p[0],p[1]) && !hitContext.isPointInStroke(path,p[0],p[1]);
    });
  }
  function remember(before) {
    undo.push(before);
    if (undo.length>80) undo.shift();
    redo.length=0;
    save();updateControls();schedule();
  }
  function clearVisible() {
    cancelGesture();
    if (!strokes.length) return;
    const before=strokes;
    strokes=[];
    remember(before);
    announce('Visible annotations cleared. Undo is available.');
  }
  canvas.addEventListener('pointerdown',event=>{
    if (gesture || event.button!==0 || tool==='browse') return;
    event.preventDefault();
    render();
    canvas.setPointerCapture(event.pointerId);
    const p = point(event);
    gesture = {id:event.pointerId,before:strokes,last:p};
    if (tool==='erase') eraseAt(p);
    else gesture.stroke = {tool,color,width:tool==='highlight'?width*4:width,pen:event.pointerType==='pen',points:[p]};
    schedule();
  });
  canvas.addEventListener('pointermove',event=>{
    if (!gesture || event.pointerId!==gesture.id) return;
    for (const e of (event.getCoalescedEvents?.().length ? event.getCoalescedEvents() : [event])) {
      const p = point(e);
      if (gesture.stroke) gesture.stroke.points.push(p);
      else {
        const [x,y] = gesture.last, steps=Math.max(1,Math.ceil(Math.hypot(p[0]-x,p[1]-y)/5));
        for(let i=1;i<=steps;i++) eraseAt([x+(p[0]-x)*i/steps,y+(p[1]-y)*i/steps]);
      }
      gesture.last=p;
    }
    schedule();
  });
  canvas.addEventListener('pointerup',event=>{
    if (!gesture || event.pointerId!==gesture.id) return;
    const {before,stroke} = gesture;
    if (stroke) { stroke.points.push(point(event));strokes=[...strokes,stroke]; }
    gesture=null;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    if (stroke || strokes.length!==before.length) remember(before);
    else schedule();
  });
  canvas.addEventListener('pointercancel',()=>{cancelGesture();schedule();});
  canvas.addEventListener('lostpointercapture',()=>{cancelGesture();schedule();});
  launcher.addEventListener('click',()=>{
    toolbar.hidden=!toolbar.hidden;
    launcher.setAttribute('aria-expanded',String(!toolbar.hidden));
    selectTool(toolbar.hidden?'browse':'pen');
    if (!toolbar.hidden) toolbar.querySelector('[data-ink="pen"]').focus();
  });
  toolbar.addEventListener('click',event=>{
    const el=event.target.closest('button');
    if (!el) return;
    const action=el.dataset.ink;
    if (el.dataset.inkColor) { color=el.dataset.inkColor;updateControls();return; }
    if (['browse','pen','highlight','erase'].includes(action)) selectTool(action);
    if (action==='close') { toolbar.hidden=true;launcher.setAttribute('aria-expanded','false');selectTool('browse');launcher.focus(); }
    if (action==='undo' && undo.length) { redo.push(strokes);strokes=undo.pop();save(); }
    if (action==='redo' && redo.length) { undo.push(strokes);strokes=redo.pop();save(); }
    if (action==='clear') clearVisible();
    updateControls();schedule();
  });
  toolbar.querySelector('input').addEventListener('input',event=>{
    width=Number(event.target.value);
    toolbar.querySelector('output').value=width;
    event.target.setAttribute('aria-valuetext',`${width} pen pixels, ${width*4} highlighter pixels`);
  });
  document.addEventListener('keydown',event=>{
    if (event.key==='Escape' && !document.querySelector('dialog[open]') && !event.target.matches('textarea, input:not(#inkWidth)')) {
      cancelGesture();clearVisible();selectTool('browse');schedule();
    }
  });
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',changedLayout);
  window.addEventListener('hashchange',()=>{cancelGesture();selectTool('browse');changedLayout();});
  main.addEventListener('toggle',changedLayout,true);
  const resizeObserver=new ResizeObserver(changedLayout);
  for (const element of [main,document.querySelector('#sidebar'),document.querySelector('.topbar')]) resizeObserver.observe(element);
  new MutationObserver(changedLayout).observe(main,{childList:true,subtree:true});
  if (!window.PerfectFreehand?.getStroke) { launcher.disabled=true;launcher.title='Drawing library could not load';return; }
  window.lucide?.createIcons();
  updateControls();schedule();
})();
