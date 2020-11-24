/* eslint-disable strict */
const knex = require("knex");
const app = require("./app");
const { PORT, DATABASE_URL } = require("./config");
const { getAllRecipes } = require("./recipes/recipe_router");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`server is running effectively at http://localhost:${PORT}`);
});
