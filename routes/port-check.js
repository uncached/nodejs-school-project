var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const isPortReachable = require('is-port-reachable');

router.get('/', function(req, res, next) {
  res.render('port-check', { title: 'Port check', tool_name: 'Port check tool', tool_des: 'Check if TCP port is open or closed' });
});

router.post('/', function(req, res) {
    if (req.body.address==''||req.body.port=='') res.render('port-check', { title: 'Port check', tool_name: 'Port check tool', tool_des: 'Check if TCP port is open or closed', error: true });
    else isPortReachable(req.body.port||80, {host: req.body.address}).then(reachable => {
	console.log(reachable);
	var stt = false;
	if (reachable) stt=true;
    res.render('port-check', { title: 'Ping port', tool_name: 'Ping port tool', tool_des: 'Check if TCP port is open or closed', input: req.body, stt: stt });
    });
});

module.exports = router;