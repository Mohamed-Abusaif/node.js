const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const applyRoutes = require("../routes/appRoutes");

module.exports = (app) => {
  // Enable CORS
  app.use(
    cors({
      origin: ["*", "http://localhost:3000"],
      methods: "GET, POST, PUT, DELETE, OPTIONS, HEAD",
    })
  );

  app.options("*", cors());

  // Development logging
  app.use(morgan("dev"));
  //set view engine
  app.set("view engine", "ejs");
  app.set("views", "./views");
  app.use(express.static("public"));

  // Body parser, reading data from body into req.body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Apply routes with upload middleware
  applyRoutes(app);

  // Handle undefined routes
  app.all("*", (req, res, next) => {
    res.status(404).json({
      status: "fail",
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });
};
