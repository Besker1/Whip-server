const express = require("express");
const { v4: uuid } = require("uuid");
const userRouter = express.Router();
const jasonParser = express.json();
const logger = require("../logger");
const users = require("./userService");

userRouter
  .route("/users")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    users.getAllUsers(knexInstance).then((res) => res.json());
    res.status(201);
  })

  .post((req, res, next) => {
    const knexInstance = re.get.app("db");
    const { user };
    users.createUser(knexInstance, newUser);
  });
