import jsdom from 'jsdom';

const vextabRenderSvg = (content, {
  width = 640,
  offset = [0, 0],
  ...options
} = {}) => new Promise((resolve, reject) => {
  const { JSDOM, VirtualConsole } = jsdom;
  const virtualConsole = new VirtualConsole();
  
  virtualConsole.on('error', (err) => {
    reject(err);
  });

  const { window } = new JSDOM(`
    <!DOCTYPE html>
    <body><div id="target"></div></body>
    <script id="vextab"></script>
  `, { 
    virtualConsole,
    runScripts: 'dangerously', 
    resources: 'usable',
  });

  const { document, MutationObserver } = window;
  const target = document.getElementById('target');
  
  const observer = new MutationObserver((mutations) => {
    resolve(mutations[0].target.innerHTML); 
  });
  
  observer.observe(target, { childList: true });
  
  window.eval(`
    const data = \`${content}\`;
    const script = document.getElementById('vextab');
    script.onload = () => {
      try {
        const { VexTab, Artist, Vex } = vextab;
        const Renderer = Vex.Flow.Renderer;

        const renderer = new Renderer('target', Renderer.Backends.SVG);
        const artist = new Artist(0, 0, 640, {});
        const tab = new VexTab(artist);

        tab.parse(data);
        artist.render(renderer);
      } catch (err) {
        console.error(err); 
      }
   };
   script.src = 'https://unpkg.com/vextab@3.0.6/releases/main.prod.js';
  `);
});

export default vextabRenderSvg;
