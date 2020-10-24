const {join} = require('path');

const {emojiFlag} = require('country-coder');
const {Database} = require('sqlite3');
const SQLiteTag = require('sqlite-tag');

const db = new Database(join(__dirname, '..', 'worldcities.db'));

const {all, query} = SQLiteTag(db);

all`SELECT id, iso2 FROM worldcities_country`.then(results => {
  const all = [];
  for (const {id, iso2} of results)
    all.push(query`UPDATE worldcities_country SET flag = ${emojiFlag(iso2)} WHERE id = ${id}`);
  Promise.all(all).then(() => db.close());
});
