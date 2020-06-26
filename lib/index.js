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
    <script src="file://node_modules/vextab/dist/div.prod.js"></script>
  `, {
    runScripts: 'dangerously',
    resources: 'usable',
  });
  
  window.eval(`
    const { VexTab, Artist, Vex } = vextab;
    const Renderer = Vex.Flow.Renderer;
    const renderer = new Renderer('elem', Renderer.Backends.SVG);
    const artist = new Artist(${offset[0]}, ${offset[1]}, ${width}, ${JSON.stringify(options)});
    const tab = new VexTab(artist);
    tab.parse(content);
    artist.render(renderer);
  `)
  
  return window.document.getElementById('elem').innerHTML;
};


export default vextabRenderSvg;
