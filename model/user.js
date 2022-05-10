/**
 * Mongoose model for user_details collection
 */

var mongoose=require('mongoose');

var RecipeSchema = new mongoose.Schema({
    user_name : String,
    email : String,
    password : String,
    ver_code : String,
    status : String
});

module.exports = mongoose.model('user_details', RecipeSchema);