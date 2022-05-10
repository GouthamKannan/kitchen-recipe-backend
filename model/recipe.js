/**
 * Mongoose model for recipe_details collection
 */
var mongoose=require('mongoose');

var RecipeSchema = new mongoose.Schema({
    user_name : String,
    recipe_name : String,
    description : String,
    ingredients : [{
        _id : String,
        ingredient : String,
        quantity : String
    }],
    instructions : String,
    image : String,
    is_veg : Boolean,
    upvotes : [String],
    downvotes : [String],
    comments : [{
        comment_id : String,
        user_name : String,
        timestamp : String,
        comment   : String,
        upvotes : [String],
        downvotes : [String]
    }]
});

module.exports = mongoose.model('recipe_details', RecipeSchema);