var mongoose = require('mongoose');
var config = require('../config/config.json')

// config.mongoose.uri = process.env.MONGODB_URI;

mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;