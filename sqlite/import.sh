#!/usr/bin/env bash

IP2LOCATION_LITE_DB5_CSV="$1"

if [ "$IP2LOCATION_LITE_DB5_CSV" = "" ] || [ ! -f "$IP2LOCATION_LITE_DB5_CSV" ]; then
  echo 'Please provide a valid IP2LOCATION-LITE-DB5.CSV.ZIP file'
  exit 1
fi

unzip -o "$IP2LOCATION_LITE_DB5_CSV" -d ./sqlite

if [ ! -f ./sqlite/IP2LOCATION-LITE-DB5.CSV ]; then
  echo "Invalid .ZIP file: $IP2LOCATION_LITE_DB5_CSV"
  exit 1
fi

mv ./sqlite/*.TXT ./

rm -rf ./sqlite/ip2location-lite.db5

sqlite3 ./sqlite/ip2location-lite.db5 -init ./sqlite/import.sql '.exit'

rm ./sqlite/IP2LOCATION-LITE-DB5.CSV

mv ./sqlite/ip2location-lite* ./

node ./sqlite/flags.js

zip ./ip2location-lite.db5.zip -9 ./ip2location-lite.db5

npm run test

rm ./ip2location-lite.db5
