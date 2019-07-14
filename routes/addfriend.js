var User = require('../models/user').User;
var FriendRequest = require('../models/friendReq').FriendRequest;
var HttpError = require('../error').HttpError;

exports.post = async function(req,res,next){
    var reqId = req.query.id + '/' + req.session.user;
    var requestThis = await FriendRequest.find({ "reqId": reqId }).exec();
    if (requestThis[0]) {
        User.findById(req.session.user, function (err, user) {
            user.friends.push(req.query.id);
            user.save();
        });
        User.findById(req.query.id, function (err, user) {
            user.friends.push(req.session.user);
            user.save();
        });
        FriendRequest.find({ "reqId": reqId }).remove().exec();
    } else {
        User.findById(req.session.user, (err, user) => {
            var friendReq = new FriendRequest({ reqId: `${req.session.user}/${req.query.id}`, requester: req.session.user, requesterName: user.username, recipient: req.query.id });
            friendReq.save(function (err) {
                if (err) return next(new HttpError(403, 'sas'));
            });
        })

    }

    backURL = req.header('Referer') || '/';
    res.redirect(backURL);
};