var express = require('express');
var app = express();
var log = require('./libs/log')(module);
app.get('/api', function (req, res) {
 res.send('API is running');
});
app.get('/ErrorExample', function(req, res, next) {
 next(new Error('Random error!'));
});
app.use(function(req, res, next) {
 res.status(404);
 log.debug('Not found URL: ' + req.url);
 res.send({ error: 'Not found' });
 return next();
});
app.use(function(err, req, res, next){
 res.status(err.status || 500);
 log.error('Internal error(' + res.statusCode + '): ' + err.message);
 res.send({ error: err.message });
 return next();
}); 
app.listen(1337, function() {
    log.info('Express server listening on port 1337');
   }); 
   