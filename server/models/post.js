var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postModel = new Schema({
    name:       {type: String},
    body:       {type: String},
    author:     {type: String},
    category_id:{type: String},
    published_at:{type: Date, default: Date.now}
});

module.exports = mongoose.model('Posts', postModel);