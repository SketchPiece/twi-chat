var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config/config.json')
var HttpError = require('./error').HttpError;
// var mongoose = require('./libs/mongoose');

var app = express();
app.set('port', config.port);

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());

app.use(express.cookieParser('secret'));

var sessionStore = require('./libs/sessionStore');

app.use(express.session({
    secret: config.session.secret,
    key: config.session.key,
    cookie: config.session.cookie,
    store: sessionStore
}))

// app.use(function (req, res, next) {
//   req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
//   res.send("Visits: " + req.session.numberOfVisits);
// })

app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));

app.use(app.router);

require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
    res.render('derror');
})

app.use(function(err, req, res, next) {
    if (typeof err == 'number') { // next(404);
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            express.errorHandler()(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

var server = http.createServer(app);

server.listen(config.port, function() {
    console.log('Express server listening on port ' + config.port);
});

var io = require('./socket')(server);
app.set('io', io);