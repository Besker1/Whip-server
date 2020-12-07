/* eslint-disable strict */
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV, errorHandler } = require("./config");
const recipe_Router = require("./recipes/recipe_router");
const logger = require("./logger");

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

///security and debugging
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
// for athorizations
// app.use(function validateBearerToken(req, res, next) {
//   const { API_TOKEN } = process.env;
//   const authToken = req.get("Authorization");
//   if (!authToken || authToken.split(" ")[1] !== API_TOKEN) {
//     logger.error(`Unauthorized request to path: ${req.path}`);
//     return res.status(401).json({ error: "Unauthorized request" });
//   }
//   // move to the next middleware
//   next();
// });

// calling the route to get the recipes upon request
app.use(recipe_Router);

// for error handling in case entry is not valid
app.use(errorHandler);

module.exports = app;
