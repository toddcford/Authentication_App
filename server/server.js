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

  server.get('/home', (req, res) => {
    const user = {
      fname: req.query.fname, 
      lname: req.query.lname,
      username: req.query.username, 
      email: req.query.email,
      password: req.query.password,
      from:  req.query.from
    };

    app.render(req, res, req.path, { user } )
  })

  server.use('/user', user2)

  server.get('*', (req, res) => handle(req, res));

  // starting express server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`);
  });
});
