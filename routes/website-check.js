var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('website-check', { title: 'Website check', tool_name: 'Website check tool', tool_des: 'Check if a website is down or not' });
});

router.post('/', function(req, res) {
    var addr = req.body.address;
    if (req.body.address=='') res.sendStatus(304);
    else {
      const isPortReachable = require('is-port-reachable');
      isPortReachable(80, {host: addr}).then(reachable => {
	console.log(reachable);
	var stt;
	if (reachable) stt=true;
    res.render('website-check', { title: 'Website check', tool_name: 'Website check tool', tool_des: 'Check if a website is down or not', input: req.body, stt: stt });
    });
    }
});

module.exports = router;