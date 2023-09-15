const express = require('express');

const methodOverride = require('method-override');
const esj = require('ejs');
// const path = require('path');
const app = express();

const Post = require('./models/Post');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();
const myLogger = (req, res, next) => {
  console.log('Middleware Log 1');
  next();
};
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(myLogger);

app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts,
  });
});

app.get('/posts/:id', async (req, res) => {
  // console.log(req.params.id);
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.get('/posts/edit/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit', {
    post,
  });
});

app.post('/posts', async (req, res) => {
  // async - await yapısı kullanacğız.
  await Post.create(req.body); // body bilgisini Post modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/');
});

app.put('/posts/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();
  res.redirect(`/posts/${req.params.id}`);
});

app.put('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        detail: req.body.detail,
      },
      { new: true } // Bu seçenek, güncellenmiş belgeyi döndürmesini sağlar
    );
    res.render('post', {
      post, // Güncellenmiş belgeyi post.ejs şablonuna iletebiliriz
    });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});
app.get('/posts/delete/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;

db();

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
