var User = require('../models/user').User;
var FriendRequest = require('../models/friendReq').FriendRequest;

exports.post = async function(req,res,next){
        var ids = req.query.reqid.split('/');

        User.findById(req.session.user, function (err, user) {
            user.friends.push(ids[0]);
            user.save();
        });
        User.findById(ids[0], function (err, user) {
            user.friends.push(req.session.user);
            user.save();
        });
        FriendRequest.find({ "reqId": req.query.reqid }).remove().exec();
        res.redirect('/profile');
};