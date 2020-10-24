#!/usr/bin/env bash

sqlite3 ./sqlite/worldcities.db -init ./sqlite/import.sql '.exit'

mv ./sqlite/worldcities.db ./

node ./sqlite/flags.js

zip ./worldcities.db.zip -9 ./worldcities.db

npm run test

rm ./worldcities.db
