const {unlink} = require('fs');
const {dirname, join} = require('path');
const extract = require('extract-zip');

const dir = dirname(__dirname);
const zip = join(dir, 'ip2location-lite.db5.zip');

extract(zip, {dir}).then(() => {
  unlink(join(dir, 'ip2location-lite.db5.zip'), Object);
});
