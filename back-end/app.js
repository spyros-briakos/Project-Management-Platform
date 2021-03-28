'use strict'

// IMPORT PACKAGED
const express = require("express");             // Basic Package for API structure
const mongoose = require("mongoose");           // MongoDB
// const cors = require("cors");                   // ...
const logger = require('./middlewares/logger'); // Print logger on requests
// const bodyParser = require('body-parser');   // ...
const passport = require("passport");           // For user authentication
const localStradegy = require("passport-local");// For user authentication

require("dotenv/config");                       // Protect sensitive information

// DEFINE APP
const app = express();

// MIDDLEWARES
// app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(logger);
// Use the passport package (with next 2 lines)
app.use(passport.initialize());
app.use(passport.session());

// Import User model
const User = require("./models/User");
// Used for User authentication
passport.use(new localStradegy(User.authenticate()));
passport.deserializeUser(User.deserializeUser());
passport.serializeUser(User.serializeUser());

// ROUTES
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
app.use('/api-control/users', userRoutes);
app.use('/api-control/projects', projectRoutes);

// // DECLARE VARS
// const options = {
// 	key: fs.readFileSync("./server.key"),
// 	cert: fs.readFileSync("./server.crt")
// };

// JWT TOKEN FOR AUTHENTICATION
// app.use(jwt());

app.get("/", (req, res) => {
  res.send("GET/ Request");
});

// SERVER CONNECTS TO DATABASE
mongoose.connect(
  process.env.DB_CONNECTION, 
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => { console.log('Server connected to MongoDB.') }
);

// SERVER STARTS LISTENING
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server listening at http://${process.env.HOSTNAME}:${PORT}/`);
});

// server = https.createServer(options, app).listen(port, function(){
//   console.log(`Server listening at http://${process.env.HOSTNAME}:${PORT}/`);
// });
// module.exports = server;
