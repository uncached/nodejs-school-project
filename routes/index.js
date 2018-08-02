var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/robots.txt', function(req, res, next) {
  res.sendFile('../public/robots.txt');
});

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;