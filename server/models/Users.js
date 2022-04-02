const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
  connectionString: process.env.PG_URI
});

pool.connect()
  .then(() => console.log('PostgreSQL database connected'))
  .catch(() => console.log('PostgreSQL database failed to connect'));

module.exports = {
  query: function (text, params, callback) {
    return pool.query(text, params, callback);
  }
};

