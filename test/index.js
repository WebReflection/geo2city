const {reverse, search} = require('../cjs');

console.time('reverse');
reverse([51.5072, -0.1275]).then(result => {
  console.timeEnd('reverse');
  console.log(result);
});

console.time('search');
search('London, UK').then(result => {
  console.timeEnd('search');
  console.log(result);
}, Object);
