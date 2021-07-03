const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/clubee',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('dB Connect');
  },
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 8080;

const Articles = require('./models/articles');
const router = express.Router();

router.use(function (req, res, next) {
  console.log('Something is happening.');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router.get('/', function (req, res) {
  res.json({message: 'welcome to our Clubee!'});
});

router
  .route('/articles')
  .post((req, res) => {
    const articles = new Articles(req.body);
    articles.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Article created!'});
    });
  })

  .get((req, res) => {
    Articles.find((err, articles) => {
      if (err) {
        res.send(err);
      }
      res.json(articles);
    })
      .sort({publicationDate: -1})
      .limit(5);
  });

app.use('/api', router);
app.listen(port);
console.log('Server start at ' + port);
