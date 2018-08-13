var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var port_check_Router = require('./routes/port-check');
var website_check_Router = require('./routes/website-check');
// var whoisdomainRouter = require('./routes/whois-domain');
var html_to_pug_Router = require('./routes/html-to-pug');
var css_to_sass_Router = require('./routes/css-to-sass');
var html_minifier_Router = require('./routes/html-minifier');
var css_minifier_Router = require('./routes/css-minifier');
var js_minifier_Router = require('./routes/js-minifier');
var html_unminifier_Router = require('./routes/html-unminifier');
var css_unminifier_Router = require('./routes/css-unminifier');
var js_unminifier_Router = require('./routes/js-unminifier');
// var ipinfoRouter = require('./routes/ip-info');

var app = express();
const root = '/favkit/';
const currentYear = (new Date()).getFullYear();

//#begin translate language
var i18n = require("i18n");
i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en', 'vi'],
 
  // sets a custom cookie name to parse locale settings from
  cookie: 'favkitdotcom',
 
  // where to store json files - defaults to './locales'
  directory: __dirname + '/locales'
});
 
// you will need to use cookieParser to expose cookies to req.cookies
app.use(cookieParser());

// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);
//#end translate language

//limit request size
app.use(bodyParser.urlencoded({ extended: false, limit: '800kb' }));

//prevent ddos
const { RateLimiterMemory } = require('rate-limiter-flexible');
const rateLimiter = new RateLimiterMemory(
{
  points: 8,
  duration: 1,
});
const rateLimiterRule = (req, res, next) => {
  res.locals.root = root;
  res.locals.currentYear = currentYear;
  res.locals.clientIp = clientIp(req);
  rateLimiter.consume(clientIp, 1)
    .then(() => {
      next();
    })
    .catch((rateLimiterRes) => {
      res.status(429).send('Too Many Requests');
    });
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//#begin limit request when overloaded
// const protectCfg = {
//   production: process.env.NODE_ENV === 'production', // if production is false, detailed error messages are exposed to the client
//   clientRetrySecs: 1, // Client-Retry header, in seconds (0 to disable) [default 1]
//   sampleInterval: 5, // sample rate, milliseconds [default 5]
//   maxEventLoopDelay: 42, // maximum detected delay between event loop ticks [default 42]
//   maxHeapUsedBytes: 0, // maximum heap used threshold (0 to disable) [default 0]
//   maxRssBytes: 0, // maximum rss size threshold (0 to disable) [default 0]
//   errorPropagationMode: false // dictate behavior: take over the response 
//                               // or propagate an error to the framework [default false]
// }
// const protect = require('overload-protection')('express', protectCfg);
// app.use(protect);
//#end limit request when overloaded

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(root, express.static(path.join(__dirname, 'public')));

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(root + 'robots.txt$', function(req, res){
  res.sendFile(__dirname + "/" + "robots.txt");
});

app.use(root + '*', rateLimiterRule);

app.use(root, indexRouter);
app.use(root + 'port-check', port_check_Router);
app.use(root + 'website-check', website_check_Router);
// app.use(root + 'whois-domain', whoisdomainRouter);
// app.use(root + 'ip-info', ipinfoRouter);
app.use(root + 'html-to-pug', html_to_pug_Router);
app.use(root + 'css-to-sass', css_to_sass_Router);
app.use(root + 'html-minifier', html_minifier_Router);
app.use(root + 'css-minifier', css_minifier_Router);
app.use(root + 'js-minifier', js_minifier_Router);
app.use(root + 'html-unminifier', html_unminifier_Router);
app.use(root + 'css-unminifier', css_unminifier_Router);
app.use(root + 'js-unminifier', js_unminifier_Router);

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