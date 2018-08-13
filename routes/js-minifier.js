var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('js-minifier', { title: 'Javascript compressor tool', tool_name: 'Javascript compressor tool', tool_des: 'Compress Javascript code' });
});

router.post('/', function(req, res) {
    var dataInput = req.body.dataInput;
    if (dataInput=='') res.sendStatus(304);
    else {
      var UglifyJS = require("uglify-js");
      var dataOutput = UglifyJS.minify(dataInput);
      res.header('X-XSS-Protection', 0);
      if (typeof dataOutput.code === 'undefined') res.render('js-minifier', { title: 'Javascript compressor tool', tool_name: 'Javascript compressor tool', tool_des: 'Compress Javascript code', error: dataOutput.error.message });
      else res.render('js-minifier', { title: 'Javascript compressor tool', tool_name: 'Javascript compressor tool', tool_des: 'Compress Javascript code', dataOutput: dataOutput.code, inputLength: dataInput.length, outputLength: dataOutput.code.length });
    }
});

module.exports = router;