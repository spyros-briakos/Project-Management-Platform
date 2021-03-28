'use strict'

// IMPORT PACKAGED
const express = require("express");             // Basic Package for API structure
const mongoose = require("mongoose");           // MongoDB
const cors = require("cors");                   // ...
const logger = require('./middlewares/logger'); // Print logger on requests
// const bodyParser = require('body-parser');   // ...
require("dotenv/config");                       // Protect sensitive information

// DEFINE APP
const app = express();

// MIDDLEWARES
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(logger);


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

// SERVER CONFIG
const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_CONNECTION || "mongodb://localhost/scrub";
// const DB_URL = "mongodb://localhost/scrub";

// SERVER CONNECTS TO DATABASE
mongoose.connect(
  DB_URL, 
  { 
  	useNewUrlParser: true, 
  	useUnifiedTopology: true,
  	// useFindAndModify: false,
	  // useCreateIndex: true
  }
)
.then( () => console.log("Server connected to MongoDB.") )
.catch( error => console.log(error.message) );

// SERVER STARTS LISTENING
app.listen(PORT, () => {
  console.log(`Server listening at http://${process.env.HOSTNAME}:${PORT}/`);
});

// server = https.createServer(options, app).listen(port, function(){
//   console.log(`Server listening at http://${process.env.HOSTNAME}:${PORT}/`);
// });
// module.exports = server;
