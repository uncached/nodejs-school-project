var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var portcheckRouter = require('./routes/port-check');
var websitecheckRouter = require('./routes/website-check');
var whoisdomainRouter = require('./routes/whois-domain');

var app = express();
const root = '/favkit/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(root, express.static(path.join(__dirname, 'public')));

app.use('*/robots.txt', function(req, res, next){
  res.end('User-agent: *\nDisallow: /');
  next();
});

app.use(root + '*', function(req, res, next){
  res.locals.root = root;
  res.locals.clientIp = clientIp(req);
  next();
});

app.use(root, indexRouter);
app.use(root + 'port-check', portcheckRouter);
app.use(root + 'website-check', websitecheckRouter);
app.use(root + 'whois-domain', whoisdomainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function clientIp (req) {
  var ipAddress;
  // The request may be forwarded from local web server.
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // If request was not forwarded
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};

module.exports = app;
