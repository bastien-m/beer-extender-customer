const app = require('express')(),
  bodyParser = require('body-parser'),
  winston = require('winston'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  path = require('path')
  config = require(path.join('config.json')[app.get('env')]);


app.config = config;
app.winston = winston;

app.use(bodyParser.json());
app.use(bodyParser.urlEncoded({extended: true}));


app.winston.add(winston.transports.File, { filename: 'trace.log'});
app.winston.remove(winston.transports.Console);


require(path.join('authenticate.js'));
require(path.join('models'))(app);
require(path.join('controllers'))(app);
require(path.join('routes.js'))(app);


if (app.get('env') === 'development') {
  app.winston.info('Started in dev mode');
  console.log('started in development mode');
  app.use(errorHandler());
}

app.listen(app.config.port, function() {
  app.winston.info('Express server listening on port %d', app.config.port);
  console.log('Express server listening on port 3000');
});
