const express = require("express");
const router = express.Router();

var RecipeModel = require('../model/recipe')

/**
 * API Endpoint to add recipe
 */
router.post("/add_recipe", async (req, res) => {

  try {
    const { user_name, recipe_name, image, description, ingredients, instructions, is_veg } = req.body;

    // Save the recipe details in db
    var recipe = new RecipeModel({
      user_name : user_name,
      recipe_name : recipe_name,
      description : description,
      ingredients : ingredients,
      instructions : instructions,
      image : image,
      is_veg : is_veg,
      upvotes : [],
      downvotes : [],
      comments : []
    })

    await recipe.save();

    return res.status(200).json({
      success: true,
      data: "recipe created successully"
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      data: `Error in creating recipe :: ${error.message}`,
    });
  }
})

/**
 * API Endpoint to update recipe
 */
router.put("/update_recipe", async (req, res) => {

  try {
    const { _id, user_name, recipe_name, image, description, ingredients, instructions, is_veg } = req.body;

    // Update the recipe details in db
    await RecipeModel.findByIdAndUpdate({
      _id
    },
    {
        user_name : user_name,
        recipe_name : recipe_name,
        description : description,
        ingredients : ingredients,
        instructions : instructions,
        image : image,
        is_veg : is_veg
    })

    return res.status(200).json({
      success: true,
      data: "Recipe updated",
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      data: `Error in editing recipe :: ${error.message}`,
    });
  }
})

/**
 * API Endpoint to delete recipe from database
 */
router.delete("/delete_recipe", async (req, res) => {

  try {
    const { _id } = req.body;

    // Delete recipe from database
    await RecipeModel.findByIdAndDelete({
      _id
    })

    return res.status(200).json({
      success: true,
      data: "Recipe deleted",
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      data: `Error in deleting recipe :: ${error.message}`,
    });
  }
})

/**
 * API Endpoint to get all recipes
 */
router.get("/get_recipes", async (req, res) => {

  try {

    // Get the recipes from database
    const recipes = await RecipeModel.find({})

    return res.status(200).json({
      success: true,
      data: recipes
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      data: `Error in getting recipe :: ${error.message}`,
    });
  }
})

/**
 * API Endpoint to get recipes of particular user
 */
router.get("/get_recipe/:user_name", async (req, res) => {

  try {

    // Get recipes of given user from database
    const user_name = req.params.user_name;
    const recipes = await RecipeModel.find({user_name : user_name})

    return res.status(200).json({
      success: true,
      data: recipes
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      data: `Error in deleting recipe :: ${error.message}`,
    });
  }
})

/**
 * API Enpoint to increase upvote of recipe
 */
router.put("/inc_upvote_recipe", async (req, res) => {

  try {
    const { _id, user_name } = req.body;
    await RecipeModel.findByIdAndUpdate({
      _id
    },
    {
      // Add user name to the upvotes and remove from downvotes if found
      $push : {
        'upvotes' : user_name
      },
      $pull : {
        'downvotes' : user_name
      }
    })

    return res.status(200).json({
      success: true,
      data: "Upvotes updated successully"
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      data: `Error in updating upvotes :: ${error.message}`,
    });
  }
})

/**
 * API Endpoint to decrease upvotes of recipe
 */
router.put("/dec_upvote_recipe", async (req, res) => {

  try {
    const { _id, user_name } = req.body;

    await RecipeModel.findByIdAndUpdate({
      _id
    },

    // Remove the username from upvotes
    {
      $pull : {
        'upvotes' : user_name
      }
    })

    return res.status(200).json({
      success: true,
      data: "Upvotes updated successully"
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      data: `Error in updating upvotes :: ${error.message}`,
    });
  }
})

/**
 * API Endpoint to increase downvotes of recipe
 */
router.put("/inc_downvote_recipe", async (req, res) => {

  try {
    const { _id, user_name } = req.body;

    await RecipeModel.findByIdAndUpdate({
      _id
    },
    // Add user name to the downvotes and remove from upvotes if found
    {
      $push : {
        'downvotes' : user_name
      },
      $pull : {
        'upvotes' : user_name
      }
    })

    return res.status(200).json({
      success: true,
      data: "downvotes updated successully"
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      data: `Error in updating downvotes :: ${error.message}`,
    });
  }
})

/**
 * API Endpoint to decrease downvotes of recipe
 */
router.put("/dec_downvote_recipe", async (req, res) => {

  try {
    const { _id, user_name } = req.body;

    await RecipeModel.findByIdAndUpdate({
      _id
    },
    // Remove the user name from downvotes
    {
      $pull : {
        'downvotes' : user_name
      }
    })

    return res.status(200).json({
      success: true,
      data: "downvotes updated successully"
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      data: `Error in updating downvotes :: ${error.message}`,
    });
  }
})

module.exports = router;