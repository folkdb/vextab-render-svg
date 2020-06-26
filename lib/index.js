import jsdom from 'jsdom';
import vextab from 'vextab';


const vextabRenderSvg = (content, {
  width = 640,
  offset = [0, 0],
  ...options
}) => {
  const { JSDOM } = jsdom;
  const { window } = new JSDOM('<!DOCTYPE html><body><div></div></body>');
  const div = window.document.body.firstChild;
  
  window.setTimeout = (() => {
    const { VexTab, Artist, Vex } = vextab;
    const Renderer = Vex.Flow.Renderer;
    
    const renderer = new Renderer(div, Renderer.Backends.SVG);
    const artist = new Artist(offset[0], offset[1], width, options);
    const tab = new VexTab(artist);
  
    tab.parse(content);
    artist.render(renderer);
  }, 0);
  
  return div.innerHTML;
};


export default vextabRenderSvg;
