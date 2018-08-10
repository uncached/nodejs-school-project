var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const isPortReachable = require('is-port-reachable');

router.get('/', function(req, res, next) {
  res.render('website-check', { title: 'Website check', tool_name: 'Website check tool', tool_des: 'Check if a website is down or not' });
});

router.post('/', function(req, res) {
    if (req.body.address=='') res.send(304);
    else isPortReachable(80, {host: req.body.address}).then(reachable => {
	console.log(reachable);
	var stt;
	if (reachable) stt=true;
    res.render('website-check', { title: 'Website check', tool_name: 'Website check tool', tool_des: 'Check if a website is down or not', input: req.body, stt: stt });
    });
});

module.exports = router;