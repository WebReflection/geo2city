# geo2city

A tiny, portable, offline search and reverse geocode, based on [simplemaps.com](https://simplemaps.com/data/world-cities)'s *World Cities Database* basic data.

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
