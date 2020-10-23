const {reverse, search} = require('../cjs');

console.time('reverse');
reverse([51.509865, -0.118092]).then(result => {
  console.timeEnd('reverse');
  console.log(result);
});

/*
console.time('search');
search('UK, London').then(result => {
  console.timeEnd('search');
  console.log(result);
});
*/
