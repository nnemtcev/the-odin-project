const express = require('express');
const router = express.Router();

const gameControllers = require('../controllers/gameControllers');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
