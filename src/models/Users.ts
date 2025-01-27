import pg from 'pg';
import dotenv from 'dotenv'
dotenv.config();

const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
};

/*
const pool = new pg.Pool({
  connectionString: process.env.PG_URI
});
*/

const pool = new pg.Client(config);

pool.connect()
  .then(():void => {
    pool.query('Update users SET online=false');
    console.log('PostgreSQL database connected');
  })
  .catch(():void => console.log('PostgreSQL database failed to connect'));

export default function (text:string, params?:any, callback?:any) {
    return pool.query(text, params, callback);
};

