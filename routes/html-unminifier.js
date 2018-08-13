var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('html-unminifier', { title: 'HTML unminifier tool', tool_name: 'HTML unminifier tool', tool_des: 'Beautify HTML code' });
});

router.post('/', function(req, res) {
    var dataInput = req.body.dataInput;
    if (dataInput=='') res.sendStatus(304);
    else {
      var pretty = require('pretty');
      var dataOutput=pretty(dataInput);
      res.header('X-XSS-Protection', 0);
      res.render('html-unminifier', { title: 'HTML unminifier tool', tool_name: 'HTML unminifier tool', tool_des: 'Beautify HTML code', dataOutput: dataOutput  });
    }
});

module.exports = router;