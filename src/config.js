/* eslint-disable strict */
function errorHandler(error, req, res, next) {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
  next();
}
module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://uncleB@localhost/recipes_db",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://uncleB@localhost/recipes_db-Test",
  errorHandler,
};
