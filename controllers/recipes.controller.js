const {
  readRecipes,
  readRecipe,
  writeRecipe,
} = require("../models/recipes.model");

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

exports.postRecipe = (req, res, next) => {
  writeRecipe(req.body)
    .then((recipe) => {
      res.status(201).send({ recipe });
    })
    .catch(next);
};
