CREATE TABLE worldcities_csv (
  city VARCHAR(128),
  city_ascii VARCHAR(128),
  lat FLOAT,
  lng FLOAT,
  country VARCHAR(64),
  iso2 CHAR(2),
  iso3 CHAR(3),
  admin_name VARCHAR(128),
  capital VARCHAR(128),
  population INTEGER,
  id INTEGER
);

-- https://simplemaps.com/data/world-cities
.mode csv
.import ./worldcities.csv worldcities_csv

CREATE TABLE worldcities_country (
  id INTEGER NOT NULL PRIMARY KEY,
  iso2 CHAR(2),
  flag VARCHAR(4),
  country VARCHAR(64)
);

INSERT INTO worldcities_country (iso2, country) SELECT DISTINCT(worldcities_csv.iso2), worldcities_csv.country FROM worldcities_csv;

CREATE TABLE worldcities_city (
  id INTEGER NOT NULL PRIMARY KEY,
  city VARCHAR(128)
);

INSERT INTO worldcities_city (city) SELECT DISTINCT(worldcities_csv.city) FROM worldcities_csv;

CREATE TABLE worldcities (
  latitude FLOAT,
  longitude FLOAT,
  country INTEGER,
  city INTEGER
);

INSERT INTO worldcities (latitude, longitude, country, city) SELECT
    worldcities_csv.lat,
    worldcities_csv.lng,
    worldcities_country.id,
    worldcities_city.id
  FROM
    worldcities_country,
    worldcities_city,
    worldcities_csv
  WHERE
    worldcities_country.country = worldcities_csv.country
  AND
    worldcities_city.city = worldcities_csv.city
;

SELECT COUNT(*) FROM worldcities_csv;
SELECT COUNT(*) FROM worldcities;
SELECT COUNT(*) FROM worldcities_city;
SELECT COUNT(*) FROM worldcities_country;

DROP TABLE worldcities_csv;

.exit
