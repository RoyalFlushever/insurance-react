var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var graphqlHTTP = require('express-graphql');
//var graphqlSchema = require('./graphqlschema');

var users = require('./routes/api/users');
var roles = require('./routes/api/roles');
var contactApi = require('./routes/api/contactApi');
var experts = require('./routes/api/experts');
var businessProviders = require('./routes/api/businessProviders');
var insuranceCompany = require('./routes/api/insuranceCompany');
var client = require('./routes/api/clients');
var contact = require('./routes/api/clientsContacts');
var businessStatuses = require('./routes/api/businessStatuses');
var manifestations = require('./routes/api/manifestations');
var versions = require('./routes/api/versions');
var paragraphs = require('./routes/api/paragraphs');
var pdfs = require('./routes/api/pdfs');
var manifestation_dates = require('./routes/api/manifestation_dates');
var passport = require('passport');
var authenticate = require('./modules/authenticate');

var app = express();

/**
 * View engine setup
 */
app.set('views', [__dirname, 'client/dist', __dirname, 'client']);
//app.set('views', path.join(__dirname, 'client/dist'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/dist')));
//app.use('/graphql', graphqlHTTP({ schema: graphqlSchema, graphiql: true }));
// session
app.use(require('express-session')({secret: 'apideo', resave: true, saveUninitialized: true}));
// initialize
app.use(passport.initialize());
// passport-session
app.use(passport.session());


/**
 * Route
 */
app.use('/api/contact', contactApi);
app.use('/api/user', users);
app.use('/api/users', users);
app.use('/api/experts', experts);
app.use('/api/businessProviders', businessProviders);
app.use('/api/insuranceCompany', insuranceCompany);
app.use('/api/client', client);
app.use('/api/client/contact', contact);
app.use('/api/client-businessStatuses', businessStatuses);
app.use('/api/manifestations', manifestations);
app.use('/api/roles', roles);
app.use('/api/versions', versions);
app.use('/api/paragraphs', paragraphs);
app.use('/api/pdfs', pdfs);
app.use('/api/manifestation_dates', manifestation_dates);
app.use('/api/roles', roles)

/**
 * Documentation
 */
app.get('/documentation', (req, res) => {
  res.render('documentation/index.html');
});

/**
 * React
 */
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('*',
    authenticate.isAuthenticated('/login'),
    (req, res) => {
  res.render('index');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
