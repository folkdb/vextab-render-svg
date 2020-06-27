import test from 'ava';
import render from '../lib/index.js';


test('Renders empty stave', async (t) => {
  const result = await render('tabstave');
  
  t.true(result.startsWith('<svg'));
});


test('Renders actual notation', async (t) => {
  const result = await render(`
    tabstave notation=true key=A time=4/4

    notes :q =|: (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
    notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :q p5/4
    text :w, |#segno, ,|, :hd, , #tr
  `);
  
  t.true(result.startsWith('<svg'));
});
