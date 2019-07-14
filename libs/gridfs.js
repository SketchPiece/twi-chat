// var mongoose = require('mongoose');
// var config = require('../config/config.json');

// var HttpError = require('../error').HttpError;

// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const connect = mongoose.createConnection(config.mongoose.uri);
// const path = require('path');
// const User = require('../models/user').User;

// let gfs;

// connect.once('open', () => {
//     // Init stream
//     gfs = Grid(connect.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }

// function editProfile() {

// }

// const storage = new GridFsStorage({
//     url: config.mongoose.uri,
//     file: (req, file) => {
//         // console.log("Пользователь "+req.session.user);
//         // console.log('=====================');
//         // console.log(file);

//         // if(file.contentType)
//         // console.log(path.extname(file.originalname));
//         return new Promise((resolve, reject) => {
//             // if (err) {
//             //     return reject(err);
//             // }
//             // if (path.extname(file.originalname) != '.png' && path.extname(file.originalname) != '.jpg') {
//             //     return resolve("typeError");
//             // }
//             if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg'){
//                 reject(new HttpError(401, "Вы использовали недопустимый формант аватара! (Дыа, гифки тоже незя ыть)"));
//             }
//             var filename = req.session.user + path.extname(file.originalname);
//             // editProfile(filename);
//             //   console.log(path.extname(file.originalname));
//             const fileInfo = {
//                 filename: filename,
//                 bucketName: 'uploads'
//             };
//             resolve(fileInfo);


//         });
//         // 
//     }
// });

var User = require('../models/user').User;


const multer = require('multer');
// const ejs = require('ejs');
const path = require('path');

const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

function delOldAva(req,filename){
    User.findById(req.session.user, async function (err, user) {
        if (err) return next(err);

        if (user.avaurl != 'default.png') {
            unlinkAsync('public/uploads/' + user.avaurl);
        }

        user.avaurl = filename;
        user.save();
    });
}

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: async function (req, file, cb) {
        //  else {
        //     var filename = req.session.user + path.extname(file.originalname);
        //     cb(null, filename);
        // }
        
        var filename = req.session.user + path.extname(file.originalname);
        // const filetypes = /gif/;
        // const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // const mimetype = filetypes.test(file.mimetype);
        // if (mimetype && extname) {
        //     filename = req.session.user + '.png';
        // }
        await delOldAva(req,filename);
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    }, fileFilter: function (req, file, cb) {
        
        checkFileType(req, file, cb);
        // delOldAva(req,filename);
        console.log(file.filename)
    }
}).single('file');

function checkFileType(req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Вы использовали недопустимый формант аватара! (Дыа, гифки тоже незя ыть)')
    }
}

// const upload = multer({ storage });

exports.Upload = upload;

// exports.GFS = gfs;