var User = require('../models/user').User;
var FriendRequest = require('../models/friendReq').FriendRequest;
var HttpError = require('../error').HttpError;

exports.get = async function(req, res, next) {
    if (req.query && req.query.id) {
        if (req.query.id == req.session.user) {
            return res.send('это ваш профиль');
        }
        User.findById(req.query.id).exec((err, user) => {
            if (err) return next(new HttpError(404, "Такого пользователя не существует"));
            
            if (req.session.theme) {
                res.render('idProfile', { user: user, theme: req.session.theme, userIdThis: req.session.user });
            } else {
                res.render('idProfile', { user: user, theme: 'dark', userIdThis: req.session.user });
            }
        });
    } else {
        var requests = await FriendRequest.find({ "recipient": req.session.user }).exec();


        // console.log(requests);


        User.findById(req.session.user).exec(async function(err, user) {
            if (err) return reject(err);
            var friends = [];
            for (var i = 0; i < user.friends.length; i++) {
                // chatInfo = chats[i].split(/\|/);
                // console.log(chatInfo);
                await User.findById(user.friends[i], function (err, user) {
                    friends.push({ username: user.username, id: user._id });
                })
            }
            if (req.session.theme) {
                res.render('profile', { user: user, requests: requests, friends: friends, theme: req.session.theme });
            } else {
                res.render('profile', { user: user, requests: requests, friends: friends, theme: 'dark' });
            }
        });
    }
};

exports.light = function(req, res) {
    req.session.theme = 'light';
    res.redirect('/profile')
};

exports.dark = function(req, res) {
    req.session.theme = 'dark';
    res.redirect('/profile')
};