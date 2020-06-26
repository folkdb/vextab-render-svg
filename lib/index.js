import jsdom from 'jsdom';


const vextabRenderSvg = (content, {
  width = 640,
  offset = [0, 0],
  ...options
} = {}) => {
  const { JSDOM } = jsdom;

  const { window } = new JSDOM(`
    <!DOCTYPE html>
    <head><script src="file://node_modules/vextab/dist/main.prod.js"></head>
    <body><div></div></body>
    <script>
      const Renderer = Vex.Flow.Renderer;
      const div = window.document.body.firstChild;
      const renderer = new Renderer(div, Renderer.Backends.SVG);
      const artist = new Artist(${offset[0]}, ${offset[1]}, ${width}, ${JSON.stringify(options)};
      const tab = new VexTab(artist);
      tab.parse(content);
      artist.render(renderer);
    </script>
  `, {
    runScripts: 'dangerously',
    resources: 'usable',
  });
  
  return window.document.body.firstChild.innerHTML;
};


export default vextabRenderSvg;
