'use strict';

const {join} = require('path');

const {Database} = require('sqlite3');
const SQLiteTag = require('sqlite-tag');

const db = new Database(join(__dirname, '..', 'worldcities.db'));
const {get} = SQLiteTag(db);

exports.reverse = ([lat, long]) => get`
  SELECT
    worldcities.latitude,
    worldcities.longitude,
    worldcities_country.iso2,
    worldcities_country.flag,
    worldcities_country.country,
    worldcities_city.city
  FROM
    worldcities,
    worldcities_country,
    worldcities_city
  WHERE
    worldcities.country = worldcities_country.id
  AND
    worldcities.city = worldcities_city.id
  ORDER BY (
    (${lat} - worldcities.latitude) * (${lat} - worldcities.latitude) +
    (${long} - worldcities.longitude) * (${long} - worldcities.longitude)
  )
  LIMIT 1
`;

exports.search = search => {
  search = search.replace(/\s*,\s*/g, ' ').trim();
  return get`
    SELECT
      latitude, longitude
    FROM
      search
    WHERE
      full = ${search}
    OR
      short = ${search}
    ORDER BY
      rank
    LIMIT 1
  `.then(geo => geo && [geo.latitude, geo.longitude]);
};
