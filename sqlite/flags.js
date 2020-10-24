const {join} = require('path');

const {emojiFlag} = require('country-coder');
const {Database} = require('sqlite3');
const SQLiteTag = require('sqlite-tag');

const db = new Database(join(__dirname, '..', 'ip2location-lite.db5'));

const {all, query} = SQLiteTag(db);

all`SELECT id, iso2 FROM ip2location_iso2`.then(results => {
  const all = [];
  for (const {id, iso2} of results)
    all.push(query`UPDATE ip2location_iso2 SET flag = ${emojiFlag(iso2)} WHERE id = ${id}`);
  Promise.all(all).then(() => db.close());
});
