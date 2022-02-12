const recipesRouter = require("express").Router();

const { getRecipes } = require("../controllers/recipes.controller");
recipesRouter.route("/").get(getRecipes); //.post();
//recipesRouter.route("/:id").get();

module.exports = recipesRouter;
