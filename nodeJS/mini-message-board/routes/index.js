var express = require('express');
var router = express.Router();

const messages = [
  {
    text: 'Hi there!',
    user: 'Armando',
    added: new Date()
  },
  {
    text: 'Hello world!',
    user: 'Charles',
    added: new Date()
  }
];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Message Board', messages });
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

router.post('/new', function(req, res) {
  messages.push(
    {
      text: req.body.text,
      user: req.body.user,
      added: new Date()
    }
  );
  res.redirect('/');
});

module.exports = router;
