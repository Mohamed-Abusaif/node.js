const express = require("express");
const mongoose = require("mongoose");
const appMiddlewares = require("./middlewares/appMiddlewares");

const app = express();

// Apply middlewares
appMiddlewares(app);

module.exports = app;