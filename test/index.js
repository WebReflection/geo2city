const {ip, reverse, search} = require('../cjs');

console.time('reverse');
reverse([52.5167, 13.3833]).then(result => {
  console.timeEnd('reverse');
  console.log(result);
});

console.time('search');
search('Berlin, Germany').then(result => {
  console.timeEnd('search');
  console.log(result);
}, Object);

console.time('ip');
ip('216.58.197.78').then(result => {
  console.timeEnd('ip');
  console.log(result);
});

