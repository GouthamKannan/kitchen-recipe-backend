const mongodbPassword = process.env.MONGODB_PASSWORD;
const dbname = "kitchen_recipe"

// Connect to mongodb using mongoose
var mongoose = require("mongoose")
const url = `mongodb+srv://goutham:${mongodbPassword}@database.0mmh4.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(
    url,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
)

var db = mongoose.connection;

// When error occured in connection
db.on('error', function() {
    console.log("Error in connecting to mongodb")
})

// When connection is successful
db.once('open', function() {
    console.log("Connected to mongodb")
})

module.exports = db;
