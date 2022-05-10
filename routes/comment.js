const express = require("express");
const router = express.Router();

var RecipeModel = require('../model/recipe')

// Add Comment
router.post("/add_comment", async (req, res) => {

    try {
      const { _id, user_name, comment } = req.body;

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

  // Upvote comment
  router.put("/inc_upvote_comment", async (req, res) => {

    try {
      const { _id, comment_id, user_name } = req.body;

      await RecipeModel.findByIdAndUpdate({
        "_id" : _id,
        "comments.comment_id" : comment_id
      },
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

  router.put("/dec_upvote_comment", async (req, res) => {

    try {
      const { _id, comment_id, user_name } = req.body;

      await RecipeModel.findByIdAndUpdate({
        "_id" : _id,
        "comments.comment_id" : comment_id
      },
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

  // Downvote comment
  router.put("/inc_downvote_comment", async (req, res) => {

    try {
      const { _id, comment_id, user_name } = req.body;

      await RecipeModel.findByIdAndUpdate({
        "_id" : _id,
        "comments.comment_id" : comment_id
      },
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

  router.put("/dec_downvote_comment", async (req, res) => {

    try {
      const { _id, comment_id, user_name } = req.body;

      await RecipeModel.findByIdAndUpdate({
        "_id" : _id,
        "comments.comment_id" : comment_id
      },
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