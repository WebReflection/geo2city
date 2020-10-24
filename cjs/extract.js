const {unlink} = require('fs');
const {dirname, join} = require('path');

const extract = require('extract-zip');
const {Database} = require('sqlite3');
const SQLiteTag = require('sqlite-tag');

const worldcities = 'worldcities.db';
const dir = dirname(__dirname);
const zip = join(dir, worldcities + '.zip');

extract(zip, {dir}).then(() => {
  unlink(zip, error => {
    if (error) {
      console.error('Unable to unzip ' + zip);
      process.exit(1);
    }
    const db = new Database(join(dir, worldcities));
    const {query} = SQLiteTag(db);
    (query`CREATE VIRTUAL TABLE search USING FTS5(full, short, latitude, longitude)`).then(() => {
      (query`
        INSERT INTO search(full, short, latitude, longitude) SELECT
          (
            worldcities_city.city || ' ' ||
            worldcities_country.country
          ),
          (
            worldcities_city.city || ' ' ||
            worldcities_country.iso2
          ),
          worldcities.latitude,
          worldcities.longitude
        FROM
          worldcities,
          worldcities_country,
          worldcities_city
        WHERE
          worldcities_country.id = worldcities.country
        AND
          worldcities_city.id = worldcities.city
      `).then(() => db.close());
    });
  });
});
