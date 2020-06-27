import test from 'ava';
import render from '../lib/index.js';


test('Renders empty stave', async (t) => {
  const result = await render('tabstave');
  
  t.true(result.startsWith('<svg'));
});
