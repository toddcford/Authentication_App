const express = require('express');
const user2 = require('./routes/user2')
const InitiateMongoServer = require('./db')
const next = require('next');
require('dotenv').config()

InitiateMongoServer();
const dev = process.env.NODE_ENV !== 'production';

const port = process.env.PORT || 4000;
const ROOT_URL = `http://localhost:${port}`;

const app = next({ dev });
const handle = app.getRequestHandler();

// Nextjs's server prepared
app.prepare().then(() => {
  const server = express();
  server.use(express.json());    
  server.use(express.urlencoded());

  server.get('/about', (req, res) => {
    const user = {
      name: req.query.name, 
      username: req.query.username, 
      email: req.query.email,
      password: req.query.password,
      from:  req.query.from
    };

    app.render(req, res, req.path, { user } )
  })

  // function logOriginalUrl(req, res, next) {
  //   console.log('Request URL: ', req.originalUrl);
  //   next()
  // }

  // function logMethod(req, res, next) {
  //   console.log('Request Type: ', req.method)
  //   next()
  // }

  // var logStuff = [logOriginalUrl, logMethod]

  // server.get('/user/:id', function (req, res, next) {
  //   if (req.params.id  ==='0') next('route')
  //   else next()
  // }, function (req, res, next) {
  //   res.send('regular')
  // })

  // server.get('/user/:id', logStuff, function(req, res, next) {
  //   res.send('random');
  // })

  // server.get('/user/:id', function(req, res, next) {

  //   res.send('special');
  // })

  server.use('/user', user2)

  server.use(function(req, res, next) {
    console.log('Time: ', Date.now())
    console.log('Original URL: ', req.originalUrl)
    console.log(req.body);
    next();
  })
  server.get('*', (req, res) => handle(req, res));

  // starting express server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`);
  });
});
