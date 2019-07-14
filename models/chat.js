var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var chatSchema = new Schema({
    nickname: String,
    msg: String,
    id: String,
    created: { type: Date, default: Date.now }
});


exports.Message = mongoose.model('Message', chatSchema);