var Direct = require('../models/direct').Direct;
var HttpError = require('../error').HttpError;
var User = require('../models/user').User;



exports.get = function (req, res, next) {
    // res.send(req.session.user+"\n"+req.params.id);
    User.findById(req.session.user, function (err, userThis) {
        if (err) return next(new HttpError(404, "Что то пошло не по плану..."));
        User.findById(req.query.id, function (err, user) {
            if (err) return next(new HttpError(404, "Такого пользователя не существует!"));

            
            // if (!userThis.directs[user._id]) console.log('это ваш профиль');
            console.log(getId(userThis._id,user._id));
            var directId = getId(userThis._id,user._id);
            if(!directId){
                next(new HttpError(404, "Случилось какая то неведома хрень. Обратитесь к Богу за помощью"));
            }

            if (req.session.theme) {
                res.render('direct', { theme: req.session.theme, anotherUserId: req.query.id, userId: req.session.user, directId: directId, anotherUsername: user.username });
            } else {
                res.render('direct', { theme: 'dark', anotherUserId: req.query.id, userId: req.session.user, directId: directId, anotherUsername: user.username });
            }
        });
    });

};


function getId(userId1from, userId2from) {
    try{
    var userId1 = ''+userId1from;
    var userId2 = ''+userId2from;

    // console.log(userId1);
    // console.log(userId2);

    var numbers = /\d+/g;

    function getNumbers(numbersArr) {
        var num = '';
        for (var i = 0; i < numbersArr.length; i++) {
            num += numbersArr[i];
        }
        return num;
    }

    var userId1Num = getNumbers(userId1.match(numbers));
    var userId2Num = getNumbers(userId2.match(numbers));

    var firstPart = Number(userId1Num) + Number(userId2Num);

    // console.log(firstPart)

    function letterCount(letter, userId) {
        var counter = 0;
        for (var i = 0; i < userId.length; i++) {
            if (userId[i] == letter) {
                counter++;
            }
        }
        return counter;
    }


    function allLetterCount(id1, id2) {
        id = id1 + id2;
        // a b c d e f g h i j k l m n o p q r s t u v w x y z 
        var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var final = '';
        for (var i = 0; i < letters.length; i++) {
            final += letterCount(letters[i], id);
        }
        // console.log(final)
        return final;
    }

    var secondPart = allLetterCount(userId1, userId2);

    var roomId = firstPart + secondPart;
    
    return roomId;
}catch{
    return false;
}
}