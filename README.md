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



## Performance

Both *search* and *reverse* takes *~10ms* to *~15ms* to provide a result, if any, on an i7 laptop.



## Attribution

The database has [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license and a backlink to [simplemaps.com](https://simplemaps.com/data/world-cities) should be provided, example:

```html
Geo data by <a href="https://simplemaps.com/data/world-cities">simplemaps</a>
```
