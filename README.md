# geo2city

A basic, portable, offline search and reverse geocode, based on [IP2Location™ LITE](https://lite.ip2location.com/database/ip-country-region-city-latitude-longitude) data.

```js
import {search, reverse} from 'geo2xity';

search('Berlin, Germany').then(console.log);
// result
[ 52.52437, 13.41053 ]

reverse([ 52.52437, 13.41053 ]).then(console.log);
// result
{
  latitude: 52.52437,
  longitude: 13.41053,
  iso2: 'DE',
  country: 'Germany',
  region: 'Berlin',
  city: 'Berlin'
}
```


## Details

Geo search and reverse geocode is complicated and expensive, and it usually requires some API or network access to be performed, with all usual limitations.

This module takes a different approach, it ships a pre-optimized *SQLite* database which, once zipped, is no more than 3MB (240MB once unzipped), and it can be used offline.

**Bear in mind** the data it includes is not super accurate, and the fields in it might not fully match cities. As example, *London*, in *UK*, is not listed, because *IP2Location™ LITE* includes more accurate details such as *Watherloo*, or other parts of the big city, but many other places *should* be easy to find.

The same is for *latitude* and *longitude* searches, the distance is granted to be super accurate, just a best effort to retrieve anny closer location.


## Performance

Both *search* and *reverse* takes *~50ms* to provide a result, if any, on an i7 laptop.

As this project is meant to run mostly in *IoT* devices, I find performance more than acceptable, but of course if you have any trick to speed things up even more, without bloating the distributed size, I'd be more than happy to receive a PR.


## Credits

As specified in *IP2Location™ LITE* page, any usage of their data should be explicitly credited via the following HTML:

```html
This site or product includes IP2Location LITE data available from <a href="https://lite.ip2location.com">https://lite.ip2location.com</a>.
```
