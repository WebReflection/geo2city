CREATE TABLE ip2location_csv (
  ip_from INT(10),
  ip_to INT(10),
  country_code CHAR(2),
  country_name VARCHAR(64),
  region_name VARCHAR(128),
  city_name VARCHAR(128),
  latitude_value FLOAT,
  longitude_value FLOAT
);

-- https://lite.ip2location.com/database/ip-country-region-city-latitude-longitude
.mode csv
.import ./sqlite/IP2LOCATION-LITE-DB5.CSV ip2location_csv

DELETE FROM ip2location_csv WHERE country_code = "-";

CREATE TABLE ip2location_geo (
  latitude_value FLOAT,
  longitude_value FLOAT
);

INSERT INTO ip2location_geo SELECT latitude_value, longitude_value FROM ip2location_csv GROUP BY latitude_value, longitude_value;

CREATE TABLE ip2location_iso2 (
  id INTEGER NOT NULL PRIMARY KEY,
  iso2 CHAR(2)
);

INSERT INTO ip2location_iso2 (iso2) SELECT DISTINCT(country_code) FROM ip2location_csv;

CREATE TABLE ip2location_country (
  id INTEGER NOT NULL PRIMARY KEY,
  country VARCHAR(64)
);

INSERT INTO ip2location_country (country) SELECT DISTINCT(country_name) FROM ip2location_csv;

CREATE TABLE ip2location_region (
  id INTEGER NOT NULL PRIMARY KEY,
  region VARCHAR(128)
);

INSERT INTO ip2location_region (region) SELECT DISTINCT(region_name) FROM ip2location_csv;

CREATE TABLE ip2location_city (
  id INTEGER NOT NULL PRIMARY KEY,
  city VARCHAR(128)
);

INSERT INTO ip2location_city (city) SELECT DISTINCT(city_name) FROM ip2location_csv;

CREATE TABLE ip2location (
  latitude FLOAT,
  longitude FLOAT,
  iso2 INTEGER,
  country INTEGER,
  region INTEGER,
  city INTEGER
);

INSERT INTO ip2location SELECT
    ip2location_geo.latitude_value,
    ip2location_geo.longitude_value,
    ip2location_iso2.id,
    ip2location_country.id,
    ip2location_region.id,
    ip2location_city.id
  FROM
    ip2location_geo,
    ip2location_iso2,
    ip2location_country,
    ip2location_region,
    ip2location_city,
    ip2location_csv
  WHERE
    ip2location_geo.latitude_value = ip2location_csv.latitude_value
  AND
    ip2location_geo.longitude_value = ip2location_csv.longitude_value
  AND
    ip2location_iso2.iso2 = ip2location_csv.country_code
  AND
    ip2location_country.country = ip2location_csv.country_name
  AND
    ip2location_region.region = ip2location_csv.region_name
  AND
    ip2location_city.city = ip2location_csv.city_name
  GROUP BY
    ip2location_csv.latitude_value, ip2location_csv.longitude_value;
;

SELECT COUNT(*) FROM ip2location_csv;
SELECT COUNT(*) FROM ip2location;
SELECT COUNT(*) FROM ip2location_geo;
SELECT COUNT(*) FROM ip2location_iso2;
SELECT COUNT(*) FROM ip2location_country;
SELECT COUNT(*) FROM ip2location_region;
SELECT COUNT(*) FROM ip2location_city;

DROP TABLE ip2location_csv;
DROP TABLE ip2location_geo;

.exit
