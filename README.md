# geo2city

[![Downloads](https://img.shields.io/npm/dm/geo2city.svg)](https://www.npmjs.com/package/geo2city) [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC) [![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

A tiny, portable, offline search and reverse geocode, also used in [Life Diary ❤️](https://github.com/WebReflection/life-diary#readme), based on [simplemaps.com](https://simplemaps.com/data/world-cities)'s *World Cities Database* basic data.

```js
import {search, reverse} from 'geo2city';

search('Berlin, Germany').then(console.log);
// result (undefined if not found)
[ 52.5167, 13.3833 ]

reverse([ 52.52437, 13.41053 ]).then(console.log);
// result (undefined if not found)
{
  latitude: 52.5167,
  longitude: 13.3833,
  iso2: 'DE',
  iso3: 'DEU',
  flag: '🇩🇪',
  country: 'Germany',
  city: 'Berlin'
}
```



## Details

Geo search and reverse geocode is complicated and expensive, and it usually requires some API or network access to be performed, with all usual limitations.

This module takes a different approach, it ships a pre-optimized *SQLite* database which, once zipped, is no more than 700K (5MB once unzipped), and it can be used offline.


### Features

  * *26563* cities and related countries
  * country name, *iso2*, *iso3*, and *emoji* flag, per each country
  * reverse search via `geo2city.reverse([latitude, longitude])` with *nearest city* approximation
  * full text search via `geo2city.search('City, Country Name or ISO')` with highest ranked result



## Attribution

The *World Cities Database* has a [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license and requires a backlink to [simplemaps.com](https://simplemaps.com/data/world-cities), example:

```html
Geo data by <a href="https://simplemaps.com/data/world-cities">simplemaps</a>
```

The [social media image](https://simplemaps.com/static/img/data/world-cities/viz/basic.png) is also readapted from simplemaps.



## About Pro / Comprehensive Database

Unfortunately, these versions of the database don't allow redistribution, but if you fork this project and run `npm i` after, then you change `worldcities.csv` with the *Pro* or *Comprehensive* database *CSV* version, and then you run `npm run import` before running `npm run postinstall`, you should have a working copy of *geo2city* pointing at a much more accurate dataset.

The *country* table would likely be the same, but the *city* one should contain all millions cities offered by *simplemaps*.

To succeed, you need any *Linux* or *macOS* with *sqlite3* and *zip* installed, however, I am not planning to support these versions, or provide help with these, because these are out of scope for this project.

**P.S.** as I haven't tried myself, it is possible that the *worldcities_csv* table in `sqlite/import.sql` should be modified to contain all fields provided by the bigger `.csv` file, but as long as field names are the same for the interested data, everything should go rather smoothly.
