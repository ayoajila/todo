require('dotenv').config() // import environment variables.

const express = require('express') // express middleware.
const morgan = require('morgan') // logging.
const winston = require('./config/winston.config') // logging config.
const compression = require('compression') // gzip response body compression.
const helmet = require('helmet') // secure http headers.
const cookieParser = require('cookie-parser') // cookie parser middleware.
const path = require('path') // path.
const cors = require('cors') // cross-origin.
const createError = require('http-errors') // http errors.

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// binding application-level middleware to an instance of the app.
app.use(morgan('combined', { stream: winston.stream })) 

app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cookieParser())
app.use(compression()) 
app.use(express.static(path.join(__dirname, 'public')))

// dnsPrefetchControl controls browser DNS prefetching
// frameguard to prevent clickjacking
// hidePoweredBy to remove the X-Powered-By header
// hsts for HTTP Strict Transport Security
// ieNoOpen sets X-Download-Options for IE8+
// noSniff to keep clients from sniffing the MIME type
// xssFilter adds some small XSS protections
app.use(helmet())
app.use(helmet.noCache()) // note, configure/add/remove based on your app needs. 

// cofigure cors options.
app.use(cors())

// enable pre-flight across-the-board.
app.options('*', cors()) 

// application api routes.
require('./routes/todo.controller')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
