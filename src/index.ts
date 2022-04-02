import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

import path from 'path';

import apiRouter from './routes/apiRouter.js';

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + '/'));

app.use('/api', apiRouter);

app.get('/bundle.js', (req, res) => {
  return res.sendFile(path.join(__dirname, '../build', 'bundle.js'));
});

app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log('server is listening to port ' + PORT);
});