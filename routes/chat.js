var User = require('../models/user').User;
exports.get = function(req, res) {
    // User.findById(req.session.user, function(err, user) {
    //     if (err) return next(err);
    //     console.log(user.avaurl);
    //     // user.avaurl = "/image/default.png";
    //     // user.save();
    // });


    if (req.session.theme) {
        res.render('chat', { theme: req.session.theme });
    } else {
        res.render('chat', { theme: 'light' });
    }
};