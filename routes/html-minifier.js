var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('html-minifier', { title: 'HTML compressor tool', tool_name: 'HTML compressor tool', tool_des: 'Compress HTML code' });
});

router.post('/', function(req, res) {
    var dataInput = req.body.dataInput;
    if (dataInput=='') res.sendStatus(304);
    else {
      var htmlmin = require('htmlmin');
      var dataOutput=htmlmin(dataInput, {removeIgnored:true, removeOptionalTags:true, collapseWhitespace:true } );
      res.header('X-XSS-Protection', 0);
      res.render('html-minifier', { title: 'HTML compressor tool', tool_name: 'HTML compressor tool', tool_des: 'Compress HTML code', dataOutput: dataOutput, inputLength: Buffer.byteLength(dataInput, 'utf8'), outputLength: Buffer.byteLength(dataOutput, 'utf8')  });
    }
});

module.exports = router;