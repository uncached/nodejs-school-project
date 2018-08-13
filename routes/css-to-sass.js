var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('css-to-sass', { title: 'CSS to SASS', tool_name: 'CSS to SASS tool', tool_des: 'Convert CSS code to SASS' });
});

router.post('/', function(req, res) {
    var dataInput = req.body.dataInput;
    if (dataInput=='') res.sendStatus(304);
    else {
      var cssConverter = require('styleflux');
      var dataOutput = cssConverter.cssToScss(dataInput);
      console.log(dataOutput)
      res.render('css-to-sass', { title: 'CSS to SASS', tool_name: 'CSS to SASS tool', tool_des: 'Convert CSS code to SASS', dataOutput: dataOutput });
    }
});

module.exports = router;