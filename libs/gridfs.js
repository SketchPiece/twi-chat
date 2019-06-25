var mongoose = require('mongoose');
var config = require('../config/config.json');

var HttpError = require('../error').HttpError;

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const connect = mongoose.createConnection(config.mongoose.uri);
const path = require('path');
const User = require('../models/user').User;

let gfs;

connect.once('open', () => {
    // Init stream
    gfs = Grid(connect.db, mongoose.mongo);
    gfs.collection('uploads');
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function editProfile() {

}

const storage = new GridFsStorage({
    url: config.mongoose.uri,
    file: (req, file) => {
        // console.log("Пользователь "+req.session.user);
        // console.log('=====================');
        // console.log(file);
        
        // if(file.contentType)
        // console.log(path.extname(file.originalname));


        return new Promise((resolve, reject) => {
            // if (err) {
            //     return reject(err);
            // }
            // if (path.extname(file.originalname) != '.png' && path.extname(file.originalname) != '.jpg') {
            //     return resolve("typeError");
            // }
            if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg'){
                reject(new HttpError(401, "Вы использовали недопустимый формант аватара! (Дыа, гифки тоже незя ыть)"));
            }
            var filename = req.session.user + path.extname(file.originalname);
            // editProfile(filename);
            //   console.log(path.extname(file.originalname));
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);


        });
        // 
    }
});
const upload = multer({ storage });

exports.Upload = upload;

exports.GFS = gfs;