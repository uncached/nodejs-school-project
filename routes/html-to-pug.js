var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
  res.render('html-to-pug', { title: 'HTML to PUG', tool_name: 'HTML to PUG tool', tool_des: 'Convert HTML code to PUG' });
});

router.post('/', function(req, res) {
    if (req.body.htmlInput=='') res.sendStatus(304);
    else {
      var html2jade = require('html2jade');
      var html = req.body.htmlInput;
      html2jade.convertHtml(html, {bodyless: true, donotencode: true, noemptypipe: true, noattrcomma: true}, function (err, jade) {
        if (err) throw err;
        res.header('X-XSS-Protection', 0);
        var btoa = require('btoa');
        var b64 = btoa(jade);
        res.render('html-to-pug', { title: 'HTML to PUG', tool_name: 'HTML to PUG tool', tool_des: 'Convert HTML code to PUG', pugOutput: b64 });
      });
    }
});

module.exports = router;