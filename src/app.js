const express = require('express');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const routes = require('./routes');
require('./config/configEnv');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
