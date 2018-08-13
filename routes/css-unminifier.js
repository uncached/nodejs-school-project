var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('css-unminifier', { title: 'CSS unminifier tool', tool_name: 'CSS unminifier tool', tool_des: 'Beautify CSS code' });
});

router.post('/', function(req, res) {
    var dataInput = req.body.dataInput;
    if (dataInput=='') res.sendStatus(304);
    else {
      var cssbeautify = require("cssbeautify");
      var dataOutput = cssbeautify(dataInput, {
          indent: '  ',
          openbrace: 'separate-line',
          autosemicolon: true
      });
      res.header('X-XSS-Protection', 0);
      res.render('css-unminifier', { title: 'CSS unminifier tool', tool_name: 'CSS unminifier tool', tool_des: 'Beautify CSS code', dataOutput: dataOutput } );
    }
});

module.exports = router;