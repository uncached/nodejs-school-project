var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('css-minifier', { title: 'CSS compressor tool', tool_name: 'CSS compressor tool', tool_des: 'Compress CSS code' });
});

router.post('/', function(req, res) {
    var dataInput = req.body.dataInput;
    if (dataInput=='') res.sendStatus(304);
    else {
      var CleanCSS = require('clean-css');
      var dataOutput = new CleanCSS().minify(dataInput);
      if (dataOutput.styles=='') var error = dataOutput.warnings;
      res.header('X-XSS-Protection', 0);
      res.render('css-minifier', { title: 'CSS compressor tool', tool_name: 'CSS compressor tool', tool_des: 'Compress CSS code', dataOutput: dataOutput.styles, error: error, inputLength: dataInput.length, outputLength: dataOutput.styles.length } );
    }
});

module.exports = router;