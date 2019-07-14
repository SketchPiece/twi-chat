var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var DirectSchema = new Schema({
    users: Schema.Types.Mixed
});


exports.Direct = mongoose.model('Direct', DirectSchema);