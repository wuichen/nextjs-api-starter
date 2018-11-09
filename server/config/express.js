const express = require('express')
const compression = require('compression')
const path = require('path')
const constants = require('./constants')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('../api/routes/v1');
const error = require('../api/middlewares/error');


const { logs } = constants
// const cors = require('cors');
// const helmet = require('helmet')
const server = express()

// request logging. dev: console | production: file
// server.use(morgan(logs));

// parse body params and attache them to req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
server.use(compression());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
server.use(methodOverride());

// server.use('/v1', routes);


// secure apps by setting various HTTP headers
// app.use(helmet());

// // enable CORS - Cross Origin Resource Sharing
// app.use(cors());

const staticPath = path.join(__dirname, '../../static')

server.use('/static', express.static(staticPath, {
	maxAge: '30d',
	immutable: true
}))

// if error is not an instanceOf APIError, convert it.
server.use(error.converter);

// catch 404 and forward to error handler
// server.use(error.notFound);

// error handler, send stacktrace only during development
server.use(error.handler);


module.exports = server