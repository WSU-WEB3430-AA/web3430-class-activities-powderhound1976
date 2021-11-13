let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// Connect to the database
import { connect } from './src/javascripts/components/db/connect';
connect('mongodb://localhost:27017/topmovies');

// Create a web server
export let app = express();

app.set('views', path.join(__dirname, 'src', 'javascripts', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Routes
import { configureRoutes } from './src/javascripts/config/routes';
configureRoutes(app);

// Handle errors
app.use(function (req, res, next) {
	res.render('layout', { content: 'error', err: createError(404), title: 'Top 10 Movies' });
});

app.use(function (err, req, res, next) {
	res.status = err.status || 500;
	res.render('layout', { content: 'error', title: 'Top 10 Movies', err: err });
});

// Start the server
let http = require('http');
let server = http.createServer(app);
server.listen(process.env.PORT || 8080);
server.on('error', err => {
	console.log(err);
	throw err;
});

server.on('listening', () => {
	let addr = server.address();
	let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	console.log('Listening on ' + bind);
});
