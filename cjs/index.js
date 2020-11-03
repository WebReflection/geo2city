'use strict';

const {join} = require('path');
const {exec} = require('child_process');

const {Database} = require('sqlite3');
const SQLiteTag = require('sqlite-tag');

const db = new Database(join(__dirname, '..', 'worldcities.db'));
const {get} = SQLiteTag(db);

/** @typedef {number} latitude */
/** @typedef {number} longitude */
/** @typedef {Array<latitude, longitude>} Coordinates */
/** @typedef {{
 *    latitude: latitude,
 *    longitude: longitude,
 *    iso2: string,
 *    iso3: string,
 *    flag: string,
 *    country: string,
 *    city: string
 *  }} GeoData
 */


/**
 * Given an array of latitude and longitude numbers, returns city related data,
 * if any, or undefined.
 * @param {Coordinates} coordinates coordinates to reverse geocode
 * @return {Promise<GeoData | void>}
 */
exports.reverse = ([latitude, longitude]) => get`
  SELECT
    worldcities.latitude,
    worldcities.longitude,
    worldcities_country.iso2,
    worldcities_country.iso3,
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
    (${latitude} - worldcities.latitude) * (${latitude} - worldcities.latitude) +
    (${longitude} - worldcities.longitude) * (${longitude} - worldcities.longitude)
  )
  LIMIT 1
`;

/**
 * Given a generic search string, optionally comma separated, returns the
 * nearest city coordinates, if any, or undefined.
 * @param {string} search string to retrieve the nearest city coordinates
 * @return {Promise<Coordinates | void>}
 */
exports.search = search => get`
  SELECT latitude, longitude FROM search
  WHERE place MATCH ${
    (search.trim() || '?').toLowerCase().split(/\s*,\s*/).join(' OR ')
  }
  ORDER BY rank
  LIMIT 1
`.then(geo => geo && [geo.latitude, geo.longitude]);

/**
 * Given a generic IPv4 address, returns city related data, if any,
 * or undefined.
 * @param {string} IPv4 address to search via geoiplookup
 * @return {Promise<Coordinates | void>}
 */
exports.ip = IPv4 => new Promise(resolve => {
  if (/^(?:\d+\.){3}\d+$/.test(IPv4))
    exec(`geoiplookup ${IPv4}`, (error, stdout) => {
      if (!error) {
        const [_, latitude, longitude] = stdout.match(
          /(?:[^,]+?,\s*){5}(-?\d+(?:\.\d+)),\s*(-?\d+(?:\.\d+)),/
        ) || ['', '', ''];
        if (latitude || longitude) {
          exports.reverse([
            parseFloat(latitude),
            parseFloat(longitude)
          ]).then(resolve);
          return;
        }
      }
      resolve();
    });
  else
    resolve();
});
