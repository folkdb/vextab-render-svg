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
    <script src="file://browser.js"></script>
  `, { runScripts: 'dangerously' });
  
  return window.document.getElementById('elem').innerHTML;
};


export default vextabRenderSvg;
