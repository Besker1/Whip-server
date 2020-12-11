const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
// bcrypt.hashSync('password', 8)

const AuthService = {
  getUserWithUserName(db, user_name) {
    console.log(user_name);
    return db("recipes_users").where({ user_name }).first();
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: "HS256",
    });
  },
  hashPassword(password) {
    return bcrypt.hashSync(password, 8);
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ["HS256"],
    });
  },
};

module.exports = {
  AuthService,
};
