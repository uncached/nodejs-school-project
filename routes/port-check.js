var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const isPortReachable = require('is-port-reachable');

router.get('/', function(req, res, next) {
  res.render('port-check', { title: 'Port check', tool_name: 'Port check tool', tool_des: 'Check if TCP port is open or closed' });
});

router.post('/', function(req, res) {
    if (req.body.address==''||req.body.port=='') res.send(304);
    else isPortReachable(req.body.port, {host: req.body.address}).then(reachable => {
	console.log(reachable);
	var stt;
	if (reachable) stt=true;
    res.render('port-check', { title: 'Ping port', tool_name: 'Ping port tool', tool_des: 'Check if TCP port is open or closed', input: req.body, stt: stt });
    });
});

module.exports = router;