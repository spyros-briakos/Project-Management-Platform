'use strict'

const moment = require("moment");

const logger = (req,res, next) => {
  console.log(
    // `${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`
    `${req.method} ${res.statusCode} ${req.originalUrl}: at ${moment().format()}`
  );
  next();
}

module.exports = logger;