const {unlink} = require('fs');
const {dirname, join} = require('path');

const extract = require('extract-zip');
const {Database} = require('sqlite3');
const SQLiteTag = require('sqlite-tag');

const ip2location = 'ip2location-lite.db5';
const dir = dirname(__dirname);
const zip = join(dir, ip2location + '.zip');

extract(zip, {dir}).then(() => {
  unlink(zip, error => {
    if (error) {
      console.error('Unable to unzip ' + zip);
      process.exit(1);
    }
    const db = new Database(join(dir, ip2location));
    const {query} = SQLiteTag(db);
    (query`CREATE VIRTUAL TABLE search USING FTS5(place, latitude, longitude)`).then(() => {
      (query`
        INSERT INTO search(place, latitude, longitude) SELECT
          (
            ip2location_city.city || ', ' ||
            ip2location_region.region || ', ' ||
            ip2location_country.country || ', ' ||
            ip2location_iso2.iso2
          ),
          ip2location.latitude,
          ip2location.longitude
        FROM
          ip2location,
          ip2location_iso2,
          ip2location_country,
          ip2location_region,
          ip2location_city
        WHERE
          ip2location.iso2 = ip2location_iso2.id
        AND
          ip2location.country = ip2location_country.id
        AND
          ip2location.region = ip2location_region.id
        AND
          ip2location.city = ip2location_city.id
      `).then(() => db.close());
    });
  });
});
