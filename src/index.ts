import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import path from 'path';
const socket = require('socket.io');
import cookieParser from 'cookie-parser';

import apiRouter from './routes/apiRouter.js';

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// app.use(express.static(__dirname + '/'));

app.use('/api', apiRouter);

app.get('/bundle.js', (req, res) => {
  return res.sendFile(path.join(__dirname, '../build', 'bundle.js'));
});

app.get('*', (req, res) => {
  console.log('hit');
  return res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use((err:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) => {
  console.log(err);
});

const server = app.listen(PORT, () => {
  console.log('server is listening to port ' + PORT);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('connection made');

  socket.on('disconnect', () => {
    console.log('connection lost');
  })
});