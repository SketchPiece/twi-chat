var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config/config.json')
var HttpError = require('./error').HttpError;
const methodOverride = require('method-override');

const session = require('express-session');

const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const favicon = require('serve-favicon');

if(!config.devMode){
config.port = process.env.PORT || 3000;
}
var app = express();
app.set('port', config.port);

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/template');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.set('view engine', 'ejs');

// app.use(express.favicon());
app.use(logger('dev'));
// app.use(express.bodyParser());

app.use(cookieParser('secret'));

const sessionStore = require('./libs/sessionStore');

app.use(session({
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

// app.use(app.router);


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
            errorHandler()(err, req, res, next);
        } else {
            if(err=="err"){
                console.log('mine');
            }
            console.log(err);
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