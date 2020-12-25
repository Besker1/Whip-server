/* eslint-disable strict */
const express = require("express");
const { v2: uid } = require("uuid");
const recipe_Router = express.Router();
const jasonParser = express.json();
const logger = require("../logger");
const recipes = require("./recipe_service.js");
const { requireAuth } = require("../middleware/jwt-auth");

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

  .post(jasonParser, (req, res, next) => {
    // move implementation logic into here
    let { title, content, meal, is_vegan, img } = req.body;
    console.log(content);

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
    if (!img) {
      img = "here";
    }

    const id = uid;
    let newRecipe = {
      id,
      title,
      content,
      meal,
      is_vegan,
      img,
    };
    console.log(newRecipe);
    recipes
      .insertNewRecipe(req.app.get("db"), newRecipe)
      .then((recipe) => {
        res.status(201).location(`/recipe/${recipe.id}`).json(recipe);
      })
      .catch(next);
    //// log the new recipe creation and send a response including a location header.

    logger.info(`recipe with id ${id} created`);

    res.status(201).location(`http://localhost:8000/recipes/${id}`);
    // .json(recipe);
  });

//recipe route with ids
recipe_Router
  .route("/recipe/:id")
  .get((req, res, next) => {
    const { id } = req.params;
    const recipe = recipes.find((c) => c.id === id);

    // looking for the recipe
    if (!recipe) {
      logger.error(`recipe with id ${id} not found.`);
      return res.status(404).send("recipe Not Found");
    }

    res.json(recipe);
  })

  /// search the recipe and by id

  .delete((req, res, next) => {
    const knexInstance = req.app.get("db");
    const { id } = req.params;
    recipes
      .deleteRecipes(knexInstance, id)
      .then((recipeSelected) => {
        res.status(204).end();
      })
      .catch(next);
  })

  .patch((rep, res, next) => {
    const knexInstance = req.app.get("db");
    const { id } = req.params;
    const { title, content, meal, is_vegan, img } = req.body;
    let newRecipe = {
      id,
      title,
      content,
      meal,
      is_vegan,
      img,
    };
    recipes
      .updateRecipes(knexInstance, id, newRecipe)
      .then((res) => res.json())
      .res.status(201)
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
  .post(jasonParser, (req, res, next) => {
    const { title, content, meal, is_vegan, img } = req.body;

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

    const id = uid();
    let newRecipe = {
      id,
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
    const { title, content, meal, is_vegan, img } = req.body;
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
