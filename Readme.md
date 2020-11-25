# WhipItUP Server

## [live](https://whipitup.besker.vercel.app/)

whipit up is an app that aloow user to be able to select recipes, between vegan recipes and non vegan.
users can also have a option for breakfast, lunch and dinner.

## Tech used

- PostgreSQL
- Nodejs
- Express
- mocha
- supertest
- knex

## Enpoints

- Get/

  - Any user can get recipes from the API

- POST/
  - post recipes for logged users
- PATCH

  - logged user update posted recipes

- Delete/

  - logged users can delete their own recipe posted.

##

`GET /recipe ` - provie all the recipes in the database

`GET '/'` - provide all the recipes in the database

`GET /vegan`

- provide all the recipes that is vegan

### Deployed on heroku

## Want to use my API for your next app ?

- follow these steps

## For the backend make sure you are running

- node@12.19.1

- PostgreSQL 13

- create a database make the appopriate changes to the .env file to make your database

`Cd backend`

`npm install`

`npm run migrate -- 1`

`npm run seed `

`npm start to run the server`

- should be running on localhost 8000

## [CLient-side](https://github.com/Besker1/whip-cli)
