var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('port-check', { title: res.__('port-check-title'), tool_name: res.__('port-check-name'), tool_des: res.__('port-check-description') });
});

router.post('/', function(req, res) {
    var addr = req.body.address;
    if (addr==''||req.body.port=='') res.sendStatus(304);
    else {
      const isPortReachable = require('is-port-reachable');
      isPortReachable(req.body.port, {host: addr}).then(reachable => {
      var stt;
      if (reachable) stt=true;
      res.render('port-check', { title: res.__('port-check-title'), tool_name: res.__('port-check-name'), tool_des: res.__('port-check-description'), input: req.body, stt: stt });
      });
    }
});

module.exports = router;