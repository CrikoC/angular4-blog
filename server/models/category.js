var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categoryModel = new Schema({
    name: {type: String},
    body: {type: String}
});

module.exports = mongoose.model('Categories', categoryModel);