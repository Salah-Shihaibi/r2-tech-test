const supertest = require("supertest");
const server = require("../server");
const request = supertest(server);
const { seedDB } = require("../seed");

//beforeEach(() => seedDB());

test("/api", async () => {
  const { body } = await request.get("/api").expect(200);
  expect(body.message).toBe("ok");
});

describe("GET /api/recipes", () => {
  test("status:200, respond with an array of recipes", async () => {
    const {
      body: { recipes },
    } = await request.get("/api/recipes").expect(200);
    expect(recipes).toBeInstanceOf(Array);
    recipes.forEach((recipe) => {
      expect(recipe).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          imageUrl: expect.any(String),
          instructions: expect.any(String),
        })
      );
      expect(Array.isArray(recipe.ingredients)).toBe(true);
      recipe.ingredients.forEach((ingredient) => {
        expect(ingredient).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            grams: expect.any(Number),
          })
        );
      });
      expect(Object.keys(recipe).length).toBe(4);
    });
  });

  test("status:200, respond with an array of recipes that do not include certain ingredients", async () => {
    const {
      body: { recipes },
    } = await request
      .get("/api/recipes?exclude_ingredients=coconut,coffee")
      .expect(200);
    recipes.forEach((recipe) => {
      const findIngredient = recipe.ingredients.some((ingredientObj) =>
        ["coconut", "coffee"].includes(ingredientObj.name)
      );
      expect(findIngredient).toBe(false);
    });
  });
});

describe("GET /api/recipes/:id", () => {
  test("status:200, respond with a recipe object", async () => {
    const {
      body: { recipe },
    } = await request.get("/api/recipes/recipe-31").expect(200);

    expect(recipe).toEqual({
      id: "recipe-31",
      imageUrl: "http://www.images.com/21",
      instructions: "spin it, twist it, pull it, flick it... bop it!",
      ingredients: [
        { name: "strawberries", grams: 187 },
        { name: "kale", grams: 41 },
        { name: "apple juice", grams: 64 },
        { name: "coffee", grams: 146 },
        { name: "cocoa nibs", grams: 154 },
      ],
    });
  });

  test("status:404, respond with error message", async () => {
    const {
      body: { msg },
    } = await request.get("/api/recipes/recipe-100").expect(404);
    expect(msg).toBe("No recipe found with id : recipe-100");
  });
});

describe("POST /api/recipes", () => {
  const newRecipe = {
    imageUrl: "http://www.images.com/21",
    instructions: "spin it, twist it, pull it, flick it... bop it!",
    ingredients: [
      { name: "strawberries", grams: 187 },
      { name: "kale", grams: 41 },
      { name: "apple juice", grams: 64 },
      { name: "coffee", grams: 146 },
      { name: "cocoa nibs", grams: 154 },
    ],
  };
  test("status:201, responds with the new recipe added to the database", async () => {
    const {
      body: { recipe },
    } = await request.post("/api/recipes").send(newRecipe).expect(201);
    expect(recipe).toMatchObject(newRecipe);
    expect(recipe.id === undefined).toBe(false);
  });

  test("status:400, respond with error message when parameters are missing from body content", async () => {
    const {
      body: { msg },
    } = await request
      .post("/api/recipes")
      .send({
        imageUrl: "http://www.images.com/21",
      })
      .expect(400);
    expect(msg).toBe("Invalid recipe post");
  });
});
