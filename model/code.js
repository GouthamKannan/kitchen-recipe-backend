
var mongoose=require('mongoose');

var RecipeSchema = new mongoose.Schema({
    createdAt : String,
    email : String,
    reset_code : String
});

module.exports = mongoose.model('code_details', RecipeSchema);