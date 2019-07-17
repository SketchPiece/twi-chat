var User = require('../models/user').User;
// const jimp = require('jimp');
const fs = require('fs');
const path = require('path');
// function defaultImg(res) {
//     jimp.read('default.png').then(image => {
//         try {
//             image.getBuffer(jimp.AUTO, (error, buffer) => {
//                 res.header('Content-Type', 'image/png');
//                 return res.status(200).send(new Buffer(buffer, 'base64'));
//             });
//         } catch (err) {
//             res.send('Произошла какая то ошибочка');
//             console.log(err);
//         }
//     })
// }


// function getImg(req, res, user) {
//     jimp.read('public/uploads/' + user.avaurl).then(image => {
//         try {
//             image.getBuffer(jimp.AUTO, (error, buffer) => {
//                 res.header('Content-Type', 'image/png');
//                 return res.status(200).send(new Buffer(buffer, 'base64'));
//             });
//         } catch (err) {
//             res.send('Произошла какая то ошибочка');
//             console.log(err);
//         }
//     })
// }

// let gfs;

// connect.once('open', () => {
//     // Init stream
//     gfs = Grid(connect.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

exports.get = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        try {
            var type = path.extname(user.avaurl).toLowerCase;
            // console.log(type)
            switch (type) {
                case '.png':
                    type = 'image/png';
                    break;
                case '.jpeg' | '.jpg':
                    type = 'image/jpeg';
                    break;
            }
            var img = fs.readFileSync('./public/uploads/' + user.avaurl);
            res.writeHead(200, { 'Content-Type': type });
            res.end(img, 'binary');
        } catch (err) {
            // console.log(err.code);
            if (err.code == "ENOENT") {
                console.log('ошибка');
                user.avaurl = 'default.png';
                user.save(function () {
                    var img = fs.readFileSync('./public/uploads/default.png');
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.end(img, 'binary');
                })
            }
        }
        // getImg(req, res, user);
    });
    // res.json({ file: req.file });
    // res.redirect('/');
};