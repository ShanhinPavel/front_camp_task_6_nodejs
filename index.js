const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const passport = require('./authenticate');
const { authenticateRouter, newsRouter, sourceRouter } = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'SECRET', resave: true, saveUninitialized: true }));
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use('/source', sourceRouter);
app.use('/news', newsRouter);
app.use('/authenticate', authenticateRouter);

app.get('/', (req, res) => res.redirect('/authenticate/login'));

app.get('/error', (req, res) => {
  throw new Error('error');
});

app.use((err, req, res, next) => {
  res.render('error', { title: 'Error', message: 'This is an error message' });
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000!');
});
