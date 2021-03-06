import pg from 'pg';
import dotenv from 'dotenv'
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.PG_URI
});

pool.connect()
  .then(():void => {
    pool.query('Update users SET online=false');
    console.log('PostgreSQL database connected');
  })
  .catch(():void => console.log('PostgreSQL database failed to connect'));

export default function (text:string, params?:any, callback?:any) {
    return pool.query(text, params, callback);
};

