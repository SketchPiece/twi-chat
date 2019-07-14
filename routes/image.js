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
        // console.log(err);
        // console.log(user);

        // gfs.files.findOne({ filename: user.avaurl }, (err, file) => {
        //     // Check if file
        //     if (!file || file.length === 0) {
        //         return defaultImg(res);
        //     }

        //     // Check if image
        //     if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        //         // Read output to browser
        //         const readstream = gfs.createReadStream(file.filename);
        //         readstream.pipe(res);
        //     } else {
        //         res.status(404).json({
        //             err: 'Not an image'
        //         });
        //     }
        // });
        // var file = path.join('/uploads/'+user.avaurl);
        // if (file.indexOf(path.sep) !== 0) {
        //     return res.status(403).end('Forbidden');
        // }
        // var type = mime[path.extname(file).slice(1)] || 'text/plain';
        // var s = fs.createReadStream(file);
        // console.log(file);
        // s.on('open', function () {
        //     res.set('Content-Type', type);
        //     s.pipe(res);
        // });
        // s.on('error', function () {
        //     res.set('Content-Type', 'text/plain');
        //     res.status(404).end('Not found');
        // });
        // console.log(user);
        var type = path.extname(user.avaurl).toLowerCase;
        // console.log(type)
        switch (type) {
            case '.png':
                type = 'image/png';
                break;
            case '.jpeg'|'.jpg':
                type = 'image/jpeg';
                break;
        }
        var img = fs.readFileSync('./public/uploads/' + user.avaurl);
        res.writeHead(200, {'Content-Type': type });
        res.end(img, 'binary');

        // getImg(req, res, user);
    });
    // res.json({ file: req.file });
    // res.redirect('/');
};