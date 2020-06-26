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
  `, { runScripts: 'outside-only' });
  
  window.eval(`
    import * as vextab from 'vextab';
    try {
      const { VexTab, Artist, Vex } = vextab;
      const Renderer = Vex.Flow.Renderer;
      const renderer = new Renderer('elem', Renderer.Backends.SVG);
      const artist = new Artist(0, 0, 640, {});
      
      const tab = new VexTab(artist);
      
      tab.parse(content);
      artist.render(renderer);
    } catch (err) {
      console.error(err); 
    };
  `);
  
  return window.document.getElementById('elem').innerHTML;
};


export default vextabRenderSvg;
