const express = require("express");
const router = express.Router();

var RecipeModel = require('../model/recipe')

// Add recipe
router.post("/add_recipe", async (req, res) => {

  try {
    const { user_name, recipe_name, image, description, ingredients, instructions, is_veg } = req.body;

    console.log(ingredients)
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
// Edit recipe
router.put("/update_recipe", async (req, res) => {

  try {
    const { _id, user_name, recipe_name, image, description, ingredients, instructions, is_veg } = req.body;

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

// Delete recipe
router.delete("/delete_recipe", async (req, res) => {

  try {
    const { _id } = req.body;

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

// Get all recipes
router.get("/get_recipes", async (req, res) => {

  try {
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

// Get recipe by user_name
router.get("/get_recipe/:user_name", async (req, res) => {

  try {
    const user_name = req.params.user_name;

    console.log(user_name)
    const recipes = await RecipeModel.find({user_name : user_name})
    console.log(recipes)

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

// Upvote recipe
router.put("/inc_upvote_recipe", async (req, res) => {

  try {
    const { _id, user_name } = req.body;

    console.log(_id, user_name)
    await RecipeModel.findByIdAndUpdate({
      _id
    },
    {
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

router.put("/dec_upvote_recipe", async (req, res) => {

  try {
    const { _id, user_name } = req.body;

    await RecipeModel.findByIdAndUpdate({
      _id
    },
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

// Downvote recipe
router.put("/inc_downvote_recipe", async (req, res) => {

  try {
    const { _id, user_name } = req.body;

    await RecipeModel.findByIdAndUpdate({
      _id
    },
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

router.put("/dec_downvote_recipe", async (req, res) => {

  try {
    const { _id, user_name } = req.body;

    await RecipeModel.findByIdAndUpdate({
      _id
    },
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