var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    id: String,
    name: String
    //username: String
    //checkIns: Array,
    //ratings: Array,
    //posts: Array

})

//Define a model for 'users' collection
module.exports = mongoose.model('User', userSchema)

