const fs = require("fs");

exports.readRecipes = ({ exclude_ingredients = false }) => {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/data.json", "utf8", (err, data) => {
      if (err) {
        reject({
          status: 500,
          msg: err,
        });
      } else {
        let recipeArray = JSON.parse(data);
        if (exclude_ingredients) {
          const exclude_ingredients_array = exclude_ingredients.split(",");
          recipeArray = recipeArray.filter((recipe) => {
            return !recipe.ingredients.some((ingredient) =>
              exclude_ingredients_array.includes(ingredient.name)
            );
          });
        }
        resolve(recipeArray);
      }
    });
  });
};
