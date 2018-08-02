var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var whois = require('whois-ux');

router.get('/', function(req, res, next) {
    
    whois.whois('140.82.9.6', function (err, data){
	console.log(JSON.stringify(data));
});
    
  res.render('whois-domain', { title: 'Find the owner of a domain', tool_name: 'Domain name lookup service', tool_des: ' Find out who registered a website and check info' });
});

router.post('/', function(req, res) {
    if (req.body.address=='') res.send(304);
});

module.exports = router;