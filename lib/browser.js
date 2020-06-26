import * as vextab from 'vextab';


(() => {
  const { VexTab, Artist, Vex } = vextab;
  const Renderer = Vex.Flow.Renderer;
  const renderer = new Renderer('elem', Renderer.Backends.SVG);
  const artist = new Artist(0, 0, 640, {});
  
  const tab = new VexTab(artist);
  
  tab.parse(content);
  artist.render(renderer);
})();
