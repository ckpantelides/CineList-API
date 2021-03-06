const debug = require('debug')('cinelist:app');
const express = require('express');
const path = require('path');
const preload = require('./bin/lib/preload');

const app = express();

app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
 });

// uncomment after placing your favicon in /public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('documentation'));

app.get('/__gtg', (req, res) => res.end());
app.use('/check', require('./routes/check'));
app.use('/get', require('./routes/get'));
app.use('/search', require('./routes/search'));

preload();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.end();
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    debug('Stack err:', err);
    res.status(err.status || 500);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status : err.status,
    message : `Sorry, an error occurred.`
  });
});


module.exports = app;
