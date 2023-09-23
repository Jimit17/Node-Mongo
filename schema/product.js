var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var my_products = new Schema({
p_name :String,
p_price :Number,
p_desc :String
});

module.exports = mongoose.model('products', my_products);