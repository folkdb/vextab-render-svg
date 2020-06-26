import test from 'ava';
import render from '../lib/index.js';


test('Renders empty stave', async (t) => {
  t.true(render('tabstave').startsWith('<svg'));
});
