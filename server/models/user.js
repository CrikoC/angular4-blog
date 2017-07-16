var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userModel = new Schema({
    name:       {type: String},
    email:      {type: String, required:true},
    username:   {type: String, required:true},
    password:   {type: String, required:true}
});


const User = module.exports = mongoose.model('Users',userModel);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
};