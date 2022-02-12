const recipesRouter = require("express").Router();

const {
  getRecipes,
  getRecipe,
  postRecipe,
} = require("../controllers/recipes.controller");
recipesRouter.route("/").get(getRecipes).post(postRecipe);
recipesRouter.route("/:id").get(getRecipe);

module.exports = recipesRouter;
