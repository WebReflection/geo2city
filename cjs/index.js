'use strict';

const {join} = require('path');

const {Database} = require('sqlite3');
const SQLiteTag = require('sqlite-tag');

const db = new Database(join(__dirname, '..', 'ip2location-lite.db5'));
const {get} = SQLiteTag(db);

exports.reverse = ([lat, long]) => get`
  SELECT
    ip2location.latitude,
    ip2location.longitude,
    ip2location_iso2.iso2,
    ip2location_country.country,
    ip2location_region.region,
    ip2location_city.city
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
  ORDER BY (
    (${lat} - ip2location.latitude) * (${lat} - ip2location.latitude) +
    (${long} - ip2location.longitude) * (${long} - ip2location.longitude)
  )
  LIMIT 1
`;

exports.search = search => get`
  SELECT latitude, longitude FROM search
  WHERE place MATCH ${
    search.trim().replace(/\s*,\s*/g, ' ').replace(/\s{2,}/g, ' ')
  }
  ORDER BY rank
  LIMIT 1
`.then(geo => geo && [geo.latitude, geo.longitude]);
