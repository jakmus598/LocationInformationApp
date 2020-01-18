var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    id: String,
    checkIns: Array,
    ratings: Array,

})

//Define a model for 'users' collection
mongoose.model('users', userSchema)

