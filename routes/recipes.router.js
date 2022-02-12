const recipesRouter = require("express").Router();

const { getRecipes, getRecipe } = require("../controllers/recipes.controller");
recipesRouter.route("/").get(getRecipes); //.post();
recipesRouter.route("/:id").get(getRecipe);

module.exports = recipesRouter;
