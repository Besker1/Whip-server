require('dotenv').config()
const knex = require('knex')
const {DB_URL} = require('../config.js');
const recipe = require('./recipe_service')


const knexInstance = knex({
  client: 'pg',
  connection: DB_URL,
})

console.log(recipe.getAllRecipes())