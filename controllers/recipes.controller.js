const { readRecipes } = require("../models/recipes.model");

exports.getRecipes = (req, res, next) => {
  readRecipes(req.query)
    .then((recipes) => {
      res.status(200).send({ recipes });
    })
    .catch(next);
};
