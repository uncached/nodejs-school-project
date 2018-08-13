var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('html-to-pug', { title: 'HTML to PUG', tool_name: 'HTML to PUG tool', tool_des: 'Convert HTML code to PUG' });
});

router.post('/', function(req, res) {
    var dataInput = req.body.dataInput;
    if (dataInput=='') res.sendStatus(304);
    else {
      var html2jade = require('html2jade');
      html2jade.convertHtml(dataInput, {bodyless: true, donotencode: true, noemptypipe: true, noattrcomma: true}, function (err, jade) {
        if (err) throw err;
        res.header('X-XSS-Protection', 0);
        var btoa = require('btoa');
        var b64 = btoa(jade);
        res.render('html-to-pug', { title: 'HTML to PUG', tool_name: 'HTML to PUG tool', tool_des: 'Convert HTML code to PUG', dataOutput: b64 });
      });
    }
});

module.exports = router;