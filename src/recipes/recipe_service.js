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

  getById(knex, id) {
    return knex("recipes_table").where("id", id).returning("*");
  },

  deleteRecipes(knex, id) {
    return knex("recipes_table").where("id", id).delete();
  },

  updateRecipes(knex, id, newRecipeValues) {
    // return knex("recipes_table").where("id", id).update(newRecipeValues, returning=true).returning();
    return knex("recipes_table")
      .where({ id: id })
      .update(newRecipeValues, (returning = true))
      .returning("*");
  },
};

module.exports = recipe_services;
