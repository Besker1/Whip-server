const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
require("dotenv").config();
const { recipesTest } = require("./RecipesTest");

describe.only("Recipes Enpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("recipes_table").truncate());
  afterEach("cleanup", () => db("recipes_table").truncate());

  describe.only(`GET /recipess`, () => {
    context(`theres aren't recipes`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/").expect(200, []);
      });
    });
  });

  context("there are recipes in the database", () => {
    beforeEach("insert recipes", () => {
      return db.into("recipes_table").insert(recipesTest);
    });

    it("GET /recipe responds with 200 and all of the recipes", () => {
      return supertest(app).get("/").expect(200, recipesTest);
    });
  });
});
