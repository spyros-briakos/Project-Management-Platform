'use strict'

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require('./middlewares/logger');
// const bodyParser = require('body-parser');
require("dotenv/config");

// MIDDLEWARES
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(logger);


// ROUTES
const usersRoutes = require('./routes/users');
app.use('api/users', usersRoutes);

app.get("/", (req, res) => {
  res.send("GET/ Request");
});

// Server connects to database
mongoose.connect(
  process.env.DB_CONNECTION, 
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => { console.log('Server connected to MongoDB.') }
);

// Server starts listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server listening at http://${process.env.HOSTNAME}:${PORT}/`);
});