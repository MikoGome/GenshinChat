import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import path from 'path';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/apiRouter';

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api', apiRouter);

console.log('NODE_ENV', process.env.NODE_ENV);

app.get('/bundle.js', (req, res) => {
  return res.sendFile(path.join(__dirname, '../build', 'bundle.js'));
});

app.get('*', (req, res) => {
  if(process.env.NODE_ENV === 'development') {
    return res.sendFile(path.join(__dirname, '../client', 'index.html'));
  }
  return res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use((err:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) => {
  console.log(err);
});

const server = app.listen(PORT, () => {
  console.log('server is listening to port ' + PORT);
});

//socket stuff

import socket from './socket';

socket(server);