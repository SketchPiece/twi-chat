var HttpError = require('../error').HttpError;

module.exports = function(req, res, next) {
    //console.log('жопа');
    //console.log(req.session.user);

    if (req.session.user) {
        next();
    } else {
        //console.log('Юхуууууууууууууу');
        //res.redirect('/');
        res.redirect('/login');
    }

}