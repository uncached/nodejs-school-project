var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var whois = require('whois-ux');
var dns = require('dns');

router.get('/', function(req, res, next) {
  res.render('ip-info', { title: 'IP info', tool_name: 'IP info tool', tool_des: 'Looking for information about any IP address' });
});

router.post('/', function(req, res) {
    if (req.body.address=='') res.send(304);
    else {
      dns.resolve4(req.body.address, function (err, addresses) {
  if (err) throw err;
  console.log(addresses[0]);
  whois.whois(addresses[0], function (err, data){
    var ipinfo = JSON.stringify(data);
    console.log(ipinfo);
    res.render('ip-info', { title: 'IP info', tool_name: 'IP info tool', tool_des: 'Looking for information about any IP address', input: req.body, ipinfo: ipinfo });
});
  
  console.log('addresses: ' + JSON.stringify(addresses));
  addresses.forEach(function (a) {
    dns.reverse(a, function (err, domains) {
      if (err) {
        throw err;
      }
      console.log('reverse for ' + a + ': ' + JSON.stringify(domains));
    });
  });
});

    }
  
});


module.exports = router;