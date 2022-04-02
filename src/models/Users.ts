import pg from 'pg';
import dotenv from 'dotenv'
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.PG_URI
});

pool.connect()
  .then(() => console.log('PostgreSQL database connected'))
  .catch(() => console.log('PostgreSQL database failed to connect'));

export default {
  query: function (text:string, params:string[], callback:()=>{}) {
    return pool.query(text, params, callback);
  }
};

