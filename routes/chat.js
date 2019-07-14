var User = require('../models/user').User;
exports.get = function(req, res) {

    if (req.session.theme) {
        res.render('chat', { theme: req.session.theme });
    } else {
        res.render('chat', { theme: 'dark' });
    }
};