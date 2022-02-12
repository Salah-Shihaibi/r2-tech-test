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

exports.readRecipe = ({ id }) => {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/data.json", "utf8", (err, data) => {
      if (err) {
        reject({
          status: 500,
          msg: err,
        });
      } else {
        const requiredRecipe = JSON.parse(data).find(
          (recipe) => recipe.id === id
        );
        if (requiredRecipe === undefined) {
          reject({
            status: 404,
            msg: `No recipe found with id : ${id}`,
          });
        } else {
          resolve(requiredRecipe);
        }
      }
    });
  });
};

exports.writeRecipe = (newRecipe) => {
  const { imageUrl, instructions, ingredients } = newRecipe;
  return new Promise((resolve, reject) => {
    if (
      !typeof imageUrl === "string" ||
      !typeof instructions === "string" ||
      Array.isArray(ingredients) === false
    ) {
      reject({
        status: 400,
        msg: "Invalid recipe post",
      });
    }

    fs.readFile("./data/data.json", "utf8", (err, data) => {
      if (err) {
        reject({
          status: 500,
          msg: err,
        });
      } else {
        const recipeArray = JSON.parse(data);
        newRecipe.id =
          Math.max(...recipeArray.map((recipe) => Number(recipe.id.slice(7)))) +
          1;
        fs.writeFile(
          "./data/data.json",
          JSON.stringify([...recipeArray, newRecipe]),
          (err) => {
            if (err) {
              reject({
                status: 500,
                msg: err,
              });
            } else {
              resolve(newRecipe);
            }
          }
        );
      }
    });
  });
};
