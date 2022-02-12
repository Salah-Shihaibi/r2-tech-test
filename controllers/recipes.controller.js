const { readRecipes, readRecipe } = require("../models/recipes.model");

exports.getRecipes = (req, res, next) => {
  readRecipes(req.query)
    .then((recipes) => {
      res.status(200).send({ recipes });
    })
    .catch(next);
};

exports.getRecipe = (req, res, next) => {
  readRecipe(req.params)
    .then((recipe) => {
      res.status(200).send({ recipe });
    })
    .catch(next);
};
