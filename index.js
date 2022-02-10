const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const bodyParser = require('body-parser');

const config = require('./config');
const routes = require('./routes');
const services = require('./services');


/**
 * main index file
 */

config.load();
const app = express();
const port = config.port();

app.use(cors({ origin: config.frontendUrl() }));
app.use(cookieParser());
app.use(bodyParser.json());

services.db.connect(config.dbUrl()).then(() => {
  console.log('connected to database');
}).catch(err => {
  console.log(err);
  process.exit(1);
});

//initializing the app routes
routes.initialize(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})