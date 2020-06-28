# @folkdb/vextab-render-svg

*Render [VexTab](https://vexflow.com/vextab/) to SVG in a Node environment*

## Install

```sh
npm i @folkdb/vextab-render-svg

```

## Usage

This package is released as an ES module only. Minimum Node.js version is 12 (latest LTS as of release date). CommonJS `require()` is not supported.

```js

import vextabRenderSvg from '@folkdb/vextab-render-svg'

(async () => {
  const svg = await vextabRenderSvg(`
    tabstave notation=true key=A time=4/4
    notes :q =|: (5/2.5/3.7/4) :8 7-5/3 5h6-7/5 ^3^ :q 7V/4
  `);
  
  // do something with SVG
})();
  

```

## API

The module's default export is a function with the following parameters:

```ts
function(content: string, {
  width = 640,
  offset = [0, 0],
  ...options
} = {}): string

```

#### Required

- __content__: the VexTab string to be rendered to SVG

#### Rendering Options

- __width__: set the width of the stave in pixels
- __offset__: set the `[x, y]` offset of the stave from the upper-left corner of the canvas
- __options__: additional options passed to the VexTab's `Artist` constructor
