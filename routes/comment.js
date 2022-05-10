const express = require("express");
const router = express.Router();

var RecipeModel = require('../model/recipe')

/**
 * API Endpoint to add comment
 */
router.post("/add_comment", async (req, res) => {

    try {
      const { _id, user_name, comment } = req.body;

      // Add comment to existing recipe data
      await RecipeModel.findByIdAndUpdate({
        _id
      },
      {
        $push : {
          'comments' : {
            user_name : user_name,
            timestamp : new Date(),
            comment : comment,
            upvotes : [],
            downvotes : []
          }
        }
      })

      return res.status(200).json({
        success: true,
        data: "Comment added successully"
      });
    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in adding comment :: ${error.message}`,
      });
    }
  })

/**
 * API Endpoint to increase upvote of comment
 */
router.put("/inc_upvote_comment", async (req, res) => {

    try {
      const { _id, comment_id, user_name } = req.body;

      await RecipeModel.findByIdAndUpdate({
        "_id" : _id,
        "comments.comment_id" : comment_id
      },

      // Add the user name to upvotes and remove from downvotes if found
      {
        $push : {
          "comments.$.upvotes" : user_name
        },
        $pull : {
          "comments.$.downvotes" : user_name
        }
      })

      return res.status(200).json({
        success: true,
        data: "upvotes updated successully"
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
 * API Endpoint to decrease upvote of comment
 */
router.put("/dec_upvote_comment", async (req, res) => {

    try {
      const { _id, comment_id, user_name } = req.body;

      await RecipeModel.findByIdAndUpdate({
        "_id" : _id,
        "comments.comment_id" : comment_id
      },

      // Remove the user name from upvotes
      {
        $pull : {
          "comments.$.upvotes" : user_name
        }
      })

      return res.status(200).json({
        success: true,
        data: "upvotes updated successully"
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
 * API Endpoint to increase downvote of comment
 */
router.put("/inc_downvote_comment", async (req, res) => {

    try {
      const { _id, comment_id, user_name } = req.body;

      await RecipeModel.findByIdAndUpdate({
        "_id" : _id,
        "comments.comment_id" : comment_id
      },

      // Add the user name to downvotes and remove from upvotes if found
      {
        $push : {
          "comments.$.downvotes" : user_name
        },
        $pull : {
          "comments.$.upvotes" : user_name
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
 * API Endpoint to decrease downvote of comments
 */
router.put("/dec_downvote_comment", async (req, res) => {

    try {
      const { _id, comment_id, user_name } = req.body;

      await RecipeModel.findByIdAndUpdate({
        "_id" : _id,
        "comments.comment_id" : comment_id
      },

      // Remove the user name from downvotes
      {
        $pull : {
          "comments.$.downvotes" : user_name
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