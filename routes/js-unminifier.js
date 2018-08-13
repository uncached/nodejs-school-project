var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('js-unminifier', { title: 'Javascript unminifier tool', tool_name: 'Javascript unminifier tool', tool_des: 'Beautify Javascript code' });
});

router.post('/', function(req, res) {
    var dataInput = req.body.dataInput;
    if (dataInput=='') res.sendStatus(304);
    else {
      var beautify_js = require('js-beautify');
      var dataOutput = beautify_js(dataInput);
      res.header('X-XSS-Protection', 0);
      res.render('js-unminifier', { title: 'Javascript unminifier tool', tool_name: 'Javascript unminifier tool', tool_des: 'Beautify Javascript code', dataOutput: dataOutput });
    }
});

module.exports = router;