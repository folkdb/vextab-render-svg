import jsdom from 'jsdom';
import vextab from 'vextab';


const vextabRenderSvg = (content, {
  xOffset = 0,
  yOffset = 0,
  width = 640,
  ...options
}) => {
  const { JSDOM } = jsdom;
  const div = JSDOM.fragment('<div></div>').firstChild;
  
  const { VexTab, Artist, Vex } = vextab;
  const Renderer = Vex.Flow.Renderer;
  
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  const artist = new Artist(xOffset, yOffset, width, options);
  const tab = new VexTab(artist);

  tab.parse(content);
  artist.render(renderer);
  
  return div.innerHTML;
};


export default vextabRenderSvg;
