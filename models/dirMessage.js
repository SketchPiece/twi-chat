var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var DirMessageSchema = new Schema({
    nickname: String,
    msg: String,
    id: String,
    directId: String,
    created: { type: Date, default: Date.now }
});


exports.DirMessage = mongoose.model('DirMessage', DirMessageSchema);