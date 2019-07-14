var User = require('../models/user').User;
// const config = require('../config/config.json');
// const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
// const connect = mongoose.createConnection(config.mongoose.uri);
const jimp = require('jimp');
var upload = require('../libs/gridfs').Upload;
var HttpError = require('../error').HttpError;

// let gfs;

// connect.once('open', () => {
//     // Init stream
//     gfs = Grid(connect.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

exports.get = function (req, res, next) {
    upload(req,res, (err)=>{
        if(err){
            next(new HttpError(403,err));
        }
        else{
            res.redirect('/profile');
        }
    });
    // res.redirect('/profile');
};