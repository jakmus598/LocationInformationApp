var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    id: String,
    //username: String
    //checkIns: Array,
    //ratings: Array,
    //posts: Array

})

//Define a model for 'users' collection
mongoose.model('users', userSchema)

