const express = require('express');
const esj = require('ejs');
const path = require('path');
const app = express();

const myLogger = (req, res, next) => {
  console.log('Middleware Log 1');
  next();
};
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(myLogger);

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
