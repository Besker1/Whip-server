/* eslint-disable strict */
const express = require("express");
const path = require("path");
const xss = require("xss");
const { uid } = require("uid");
const recipe_Router = express.Router();
const jsonParser = express.json();
const logger = require("../logger");
const recipes = require("./recipe_service.js");
const { requireAuth } = require("../middleware/jwt-auth");

const serializeRecipes = (recipes) => ({
  id: recipes.id,
  title: xss(recipes.title),
  meal: recipes.meal,
  content: xss(recipes.content),
  is_vegan: recipes.is_vegan,
});
recipe_Router
  .route("/recipe")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    recipes
      .getAllRecipes(knexInstance)
      .then((recipes) => {
        res.json(recipes);
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    // move implementation logic into here
    let { title, content, meal, is_vegan, img } = req.body;
    !img ? (img = "here") : img;
    let newRecipe = { title, content, meal, is_vegan, img };
    for (const [key, value] of Object.entries(newRecipe)) {
      if (value == null) {
        logger.error(`you have to enter ${key}`);
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
      }
    }
    recipes
      .insertNewRecipe(req.app.get("db"), newRecipe)
      .then((recipe) => {
        res
          .location(path.posix.join(req.originalUrl + `/${recipe.recipeId}`))
          .status(201)
          .json(serializeRecipes(recipe));
      })
      .catch(next);
    //// log the new recipe creation and send a response including a location header.

    logger.info(`recipe with id ${id} created`);
  })

  .patch(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const { id } = req.params;
    const { title, content, meal, is_vegan, img = "here" } = req.body;
    // !img ? (img = "here") : img;

    const newRecipe = {
      id,
      title,
      content,
      meal,
      is_vegan,
      img,
    };

    console.log(newRecipe);
    recipes

      .updateRecipes(knexInstance, id, newRecipe)
      .then((response) => res.json(serializeRecipes(response)).status(201))
      .catch(next);
    logger.info(`recipe with ${id} has been updated`);
  })
  .delete((req, res, next) => {
    const knexInstance = req.app.get("db");
    const { id } = req.params;
    debugger;
    recipes
      .deleteRecipes(knexInstance, id)
      .then((recipeSelected) => {
        res.status(204).end();
      })
      .catch(next);
    logger.info(`recipe with ${id} has been deleted`);
  });

//recipe route with ids
recipe_Router
  .route("/recipe/:id")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    const { id } = req.params;
    console.log("this is an", id);
    recipes.getById(knexInstance, id).then((recipes) => {
      if (!recipes) {
        logger.error(`recipe with id ${id} not found.`);
        return res.status(404).send("recipe Not Found");
      }
      res.json(recipes);
    });
    // looking for the recipe
  })

  /// search the recipe and by id

  .delete((req, res, next) => {
    const knexInstance = req.app.get("db");
    const { id } = req.params;
    console.log("this is an", id);
    recipes
      .deleteRecipes(knexInstance, id)
      .then((recipeSelected) => {
        res.status(204).end();
      })
      .catch(next);
    logger.info(`recipe with ${id} has been deleted`);
  })

  .patch(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get("db");
    let { id } = req.params;
    let { title, content, meal, is_vegan } = req.body;

    console.log(req.body);
    const newRecipe = {
      id,
      title,
      content,
      meal,
      is_vegan,
    };
    console.log("besker the great", newRecipe);
    recipes

      .updateRecipes(knexInstance, id, newRecipe)
      .then((response) => res.json(serializeRecipes(response)).status(201))
      .catch(next);
    logger.info(`recipe with ${id} has been updated`);
  });

//// routings with dynamic ids and home path

recipe_Router
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    recipes
      .getAllRecipes(knexInstance)
      .then((recipes) => {
        res.json(recipes);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, content, meal, is_vegan, img } = req.body;
    !img ? (img = "here") : img;
    if (!title) {
      logger.error("Title is required");
      return res.status(400).send("Invalid data");
    }

    if (!content) {
      logger.error("Content is required");
      return res.status(400).send("Invalid data");
    }
    if (!meal) {
      logger.error("Meal is required");
      return res.status(400).send("Invalid data");
    }
    if (!is_vegan) {
      logger.error("have to enter if it's vegan or not");
      return res.status(400).send("Invalid data");
    }

    // function makeIds() {
    //   const temp = [];
    //   for (let i = 20; i < 10; i++) {
    //     if (temp.includes(i)) {
    //       i++;
    //     }
    //     temp.push(i);
    //   }
    //   return temp[temp.length - 1];
    // }
    // const id = makeIds();
    let newRecipe = {
      title,
      content,
      meal,
      is_vegan,
      img,
    };
    recipes
      .insertNewRecipe(req.app.get("db"), newRecipe)
      .then((recipe) => {
        res.status(201).location(`/recipes/${recipe.id}`).json(recipe);
      })
      .catch(next);
  })

  .delete((req, res, next) => {
    const knexInstance = req.app.get("db");
    const { id } = req.params;
    recipes
      .deleteRecipes(knexInstance, id)
      .then((recipeSelected) => {
        res.status(204).end();
      })
      .catch(next);
    logger.info(`recipe with ${id} has been deleted`);
  })

  .patch((req, res, next) => {
    const knexInstance = req.app.get("db");
    const { id } = req.params;
    let { title, content, meal, is_vegan, img } = req.body;
    !img ? (img = "here") : img;
    const newRecipe = {
      id,
      title,
      content,
      meal,
      is_vegan,
      img,
    };
    recipes
      .updateRecipes(knexInstance, id, newRecipe)
      .then((res) => res.json());
    res.status(201).catch(next);
    logger.info(`recipe with ${id} has been updated`);
  });

recipe_Router.route("/:recipeId").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  recipes
    .getRecipesById(knexInstance, req.params.id)
    .then((recipe) => {
      if (!recipe) {
        looger.error(`this ${recipe} is not available feel free to add it`);
        return res.status(404).send("not found");
      }
      res.json(recipe);
    })
    .catch(next);
});

module.exports = recipe_Router;
