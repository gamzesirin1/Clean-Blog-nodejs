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
  const blog = { id: 1, title: 'Blog title', description: 'Blog description' };
  res.send(blog);
});
const port = 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
