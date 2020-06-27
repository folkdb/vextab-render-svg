import jsdom from 'jsdom';

const vextabRenderSvg = (content, {
  width = 640,
  offset = [0, 0],
  ...options
} = {}) => {
  const { JSDOM } = jsdom;

  const { window } = new JSDOM(`
    <!DOCTYPE html>
    <body><div id="elem"></div></body>
    <script id="vextab"></script>
  `, { runScripts: 'dangerously', resources: 'usable' });

  window.eval(`
    const script = document.getElementById('vextab');
    script.onload = () => {
      try {
        const { VexTab, Artist, Vex } = vextab;
        const Renderer = Vex.Flow.Renderer;
        const renderer = new Renderer('elem', Renderer.Backends.SVG);
        const artist = new Artist(0, 0, 640, {});
      
        const tab = new VexTab(artist);
      
        tab.parse('${content}');
        artist.render(renderer);
      } catch (err) {
        console.error(err); 
      }
   };
   script.src = 'https://unpkg.com/vextab@3.0.6/releases/main.prod.js';
  `);

  return window.document.getElementById('elem');
};

export default vextabRenderSvg;
