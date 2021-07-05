'use strict'

// IMPORT PACKAGES
const fs = require("fs");
const https = require("https");
const http = require("http");
const express = require("express");               // Basic Package for API structure
const mongoose = require("mongoose");             // MongoDB
mongoose.set('useFindAndModify', false);
const logger = require('./middlewares/logger');   // Print logger on requests
// const bodyParser = require('body-parser');     // ...
const session = require("express-session");
const passport = require("passport");             // For user authentication
const localStradegy = require("passport-local");  // For user authentication
var cors = require('cors')

require("dotenv/config");                         // Protect sensitive information
require('./auth/auth');                           // For user authentication

// Authentication middleware (for user's secure routes)
const authenticate = require("./middlewares/authenticate");
// DEFINE APP
const app = express();

// MIDDLEWARES
app.options('*',cors());
app.use(cors());
app.use(express.urlencoded({limit: '50mb', extended: true}));  // Instead of bodyParser
app.use(express.json({limit: '50mb', extended: true}));
app.use(logger);
// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
// 	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
// 	next();
// });

app.use(session({
  // ?secret: process.env.SESSION_SECRET,
  secret: 'could_be_anything',
  resave: false,
  saveUninitialized: true
}));

// http.get('*', function(req, res) {  
//   res.redirect('https://' + req.headers.host + req.url);
// })

// Use the passport package
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const secureRoute = require('./routes/secure-routes');
const dbRoutes = require('./routes/db');

// MAKE ROUTES AVAILABLE
// Public routes
app.use('/api-control/users', userRoutes);
app.use('/api-control/db', dbRoutes);
// app.use('/api-control/user-stories', user_storyRoutes);
// Routes for logged users
// Plug in the JWT strategy as a middleware, so only verified users can access these routes.
app.use('/api-control', authenticate, projectRoutes);
app.use('/api-control/secure-routes', authenticate, secureRoute);

// JWT TOKEN FOR AUTHENTICATION
// app.use(jwt());

app.get("/", (req, res) => {
  res.send("GET/ Request");
});

// SERVER CONFIG
const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '127.0.0.1'
// const DB_URL = process.env.DB_CONNECTION || "mongodb://localhost/scrub";

// SERVER CONNECTS TO DATABASE
mongoose.connect(
  "mongodb://localhost/scrub",
  // process.env.DB_URL, 
  { 
  	useNewUrlParser: true, 
  	useUnifiedTopology: true,
  	useFindAndModify: false,
	  useCreateIndex: true
  }
)
.then( () => console.log("Server connected to MongoDB.") )
.catch( error => console.log(error.message) );

// SERVER STARTS LISTENING
// app.listen(PORT, () => {
//   console.log(`Server listening at http://${process.env.HOSTNAME}:${PORT}/`);
// });
// module.exports = app;

const options = {
	key: fs.readFileSync("./security/localhost+1-key.pem"),
	cert: fs.readFileSync("./security/localhost+1.pem"),
  requestCert: false,
  rejectUnauthorized: false
};

const server = https.createServer(options, app).listen(PORT, function(){
  console.log('Server listening at https://' + HOST + ':'+ PORT + '/');
});
// const server = http.createServer(options, app).listen(PORT, function(){
  // console.log(`Server listening at http://${process.env.HOST}:${PORT}/`);
// });
module.exports = server;
