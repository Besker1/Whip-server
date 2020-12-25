const recipe_services = {
  getAllRecipes(knex) {
    return knex.select("*").from("recipes_table");
  },

  getAllVeganRecipes(knex) {
    return knex.select("*").from("recipes_table").where("is_vegan", true);
  },

  insertNewRecipe(knex, newRecipe) {
    return knex.insert(newRecipe).into("recipes_table").returning("*");
  },

  getRecipesById(knex, id) {
    return knex.from("recipes_table").select("*").where("id", id).first();
  },

  deleteRecipes(knex, id) {
    return knex("recipes_table").where({ id }).delete();
  },

  updateRecipes(knex, id, newRecipeValues) {
    return knex("recipes_table").where({ id }).update(newRecipeValues);
  },
};

module.exports = recipe_services;
