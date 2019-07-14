var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var FriendRequestSchema = new Schema({
    reqId: {
        type: String,
        unique: true,
        required: true
    },
    requester: {
        type: String,
        required: true
    },
    requesterName: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    }
});


exports.FriendRequest = mongoose.model('FriendRequest', FriendRequestSchema);