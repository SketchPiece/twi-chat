const config = require('../config/config.json');
const HttpError = require('../error').HttpError;
const sessionStore = require('../libs/sessionStore');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const User = require('../models/user').User;
const Message = require('../models/chat').Message;
const DirMessage = require('../models/dirMessage').DirMessage;
// const debug = require('debug')('webchat:socketio');

// function updateClients(io, socket, onlineUsers) {
//     io.sockets.clients((err, clients) => {
//         if (err) throw err;
//         // onlineUsers = [];
//         clients.forEach(function(clientId) {
//             const client = io.sockets.sockets[clientId];
//             // console.log(client.handshake.session.user);

//             User.findById(client.handshake.session.user, function(err, userTemp) {
//                 if (err) console.log(err);
//                 onlineUsers.push(userTemp.username)
//                     // console.log(userTemp.username);



//                 // next();
//             });

//         });

//         // console.log(onlineUsers);
//     });
// }

const loadUser = (session) => {
    return new Promise((resolve, reject) => {
        if (!session.user) {
            // debug("Session %s is anonymous", session.id);
            // console.log("Session %s is anonymous", session.id);
            reject();
        }

        // debug("retrieving user ", session.user);
        // console.log("retrieving user ", session.user);

        User.findById(session.user).exec((err, user) => {
            if (err) return reject(err);
            if (!user) reject();

            // debug("user findbyId result: " + user);
            // console.log("user findbyId result: " + user);
            resolve(user);
        });
    });
};

const checkAuth = (handshake, callback) => {
    handshake.cookies = cookie.parse(handshake.headers.cookie || '');
    const sidCookie = handshake.cookies[config.session.key];
    // console.log(sidCookie + ' ' + config.session.secret);
    const sid = cookieParser.signedCookie(sidCookie, config.session.secret);
    // debug(sid);
    // console.log(sid + " sid");
    sessionStore.get(sid, (err, session) => {
        // debug(session);
        // console.log(session + " session");

        if (!session) {
            callback(new HttpError(401, "No session"));
        }

        handshake.session = session;
        handshake.session.sid = sid;

        loadUser(session)
            .then((user) => {
                handshake.user = user;
                callback(null, true);
            })
            .catch((err) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(new HttpError(403, "Anonymous session may not connect"));
            });
    });
};

const socket = (server) => {
    const io = require('socket.io')(server, {
        'origins': ['*:*', '*:*']
    });

    io.use((socket, next) => {
        checkAuth(socket.handshake, (err, success) => {
            if (success) return next();
            next(new HttpError(403, "Anonymous session may not connect"));
        });
    });



    // io.on('session:reload', (sid) => {
    //   console.log('session:reload :' + sid);
    //   var clients = io.sockets.clients();

    //   clients.forEach(function(client){
    //     if(client.handshake.session.id != sid) return;

    //     loadSession(sid, function(err, session){
    //       if(err){
    //         client.emit("error","server error");
    //         client.disconnect();
    //         return;
    //       }
    //       if(!session){
    //         client.emit("error","handshake unauthorized");
    //         client.disconnect();
    //         return;
    //       }
    //       client.handshake.session = session;
    //     });
    //   });
    // });

    // io.on('sessreload', (sid) => {
    //   console.log('sessreload: ' + sid);
    //   //console.log(io.sockets);
    //   io.sockets.clients((err, clients) => {
    //     if (err) throw err;

    //     clients.forEach(function(clientId) {
    //       const client = io.sockets.sockets[clientId];

    //       if (client.handshake.session.sid != sid) return;

    //       sessionStore.get(sid, (err, session) => {
    //         if (err) {
    //           client.emit("error", "server error");
    //           client.disconnect();
    //           return;
    //         }

    //         if (!session) {
    //           client.emit("logout");
    //           client.disconnect();
    //           return;
    //         }

    //         client.handshake.session = session;
    //       });
    //     });
    //   });
    // });

    io.on('sessreload', (sid) => {
        // console.log('_________________________________________________');
        // console.log('sessreloa`  1 `d: ' + sid);
        //console.log(io.sockets);
        io.sockets.clients((err, clients) => {
            if (err) throw err;

            clients.forEach(function (clientId) {
                const client = io.sockets.sockets[clientId];

                if (client.handshake.session.sid != sid) return;

                sessionStore.get(sid, (err, session) => {
                    if (err) {
                        client.emit("error", "server error");
                        client.disconnect();
                        return;
                    }

                    if (!session) {
                        client.emit("logout");
                        client.disconnect();
                        return;
                    }

                    client.handshake.session = session;
                });
            });
        });
    });
    var onlineUsers = [];
    var connectedUsers = {};
    var typeUsers = [];

    io.on('connection', (socket) => {
        const username = socket.handshake.user.get('username');
        const userid = socket.handshake.user.get('id');
        if (!connectedUsers[userid]) {
            connectedUsers[userid] = [];
        }

        connectedUsers[userid].push(socket);
        // console.log(sconnectedUsers[userid]);
        // console.log('id пользователя '+userid);
        // console.log(onlineUsers.indexOf(username))
        var user = { username: username, id: userid }
        onlineUsers.push(user);
        var query = Message.find({});
        query.sort('-created').limit(250).exec(function (err, docs) {
            if (err) throw err;
            socket.emit('load msgs', docs);
        });


        socket.on('onTyping', function (user) {
            if (typeUsers.indexOf(user) < 0) {
                typeUsers.push(user);
            }
            io.sockets.emit('notifOnType', typeUsers);
        })
        socket.on('offTyping', function (user) {
            if (typeUsers.indexOf(user) > -1) {
                typeUsers.splice(typeUsers.indexOf(user), 1);
            }
            io.sockets.emit('notifOffType', typeUsers);
        })

        socket.on('onTypingP', function (docs) {
            // io.sockets.emit('notifOnType', typeUsers);
            if (!connectedUsers[docs.userid]) return;
            for (var i = 0; i < connectedUsers[docs.userid].length; i++) {
                connectedUsers[docs.userid][i].emit('notifOnTypeP', { user: docs.username, userid: userid });
                // console.log(i+" another");
            }
        })
        socket.on('offTypingP', function (docs) {
            // console.log('a')
            // io.sockets.emit('notifOffType', typeUsers);
            if (!connectedUsers[docs.userid]) return;
            // console.log('b')
            for (var i = 0; i < connectedUsers[docs.userid].length; i++) {
                connectedUsers[docs.userid][i].emit('notifOffTypeP', { user: docs.username, userid: userid });
                // console.log(i+" another");
            }
        })

        socket.on('private mess load req', function (directId) {
            var query = DirMessage.find({ directId: directId });
            query.sort('-created').limit(250).exec(function (err, docs) {
                if (err) throw err;
                socket.emit('private mess load res', docs);
            });
        })

        socket.on('update chats', async function () {
            await User.findById(userid, async function (err, user) {
                var chats = user.chats;

                var chatsPush = [];
                for (var i = 0; i < chats.length; i++) {
                    chatInfo = chats[i].split(/\|/);
                    // console.log(chatInfo);
                    await User.findById(chatInfo[0], function (err, user) {
                        chatsPush.push({ username: user.username, id: user._id, new: chatInfo[1] });
                    })
                }
                // console.log(chatsPush);
                // console.log('Я педик' + chatsPush);
                socket.emit('push chats', chatsPush);
                // socket.emit('push chats', chatsPush);
            });
            // console.log(chats);
            // console.log(chats+'=========================');
            // io.sockets.emit('push online', onlineUsers);
            // console.log(chats);

        });

        socket.on('watch new', function (UserId) {
            User.findById(userid, function (err, user) {
                if (user.chats.indexOf(UserId + '|1') > -1) {
                    // console.log(1);
                    user.chats.splice(user.chats.indexOf(UserId + '|1'), 1);
                }
                if (user.chats.indexOf(UserId + '|0') > -1) {
                    // console.log(2);
                    user.chats.splice(user.chats.indexOf(UserId + '|0'), 1);
                    // console.log(user.chats);
                }
                user.chats.unshift(UserId + '|0');
                user.save();
            });
        })

        socket.emit('join', username);



        socket.on('private mess receive', (docs) => {
            var newDirMsg = new DirMessage({ nickname: username, msg: docs.text, id: userid, directId: docs.directId });
            newDirMsg.save(function (err) {
                if (err) throw err;
                // User.findById(client.handshake.session.user, function(err, userTemp)
                User.findById(userid, function (err, userThis) {
                    if (err) throw err;
                    User.findById(docs.userId, function (err, user) {
                        if (err) throw err;

                        // onlineUsers.splice(onlineUsers.indexOf(user), 1);

                        // console.log('USERTHIS0: '+userThis.chats.indexOf(user._id + '|0')+' USERTHIS1: '+userThis.chats.indexOf(user._id + '|1'));
                        // console.log('USER0: '+user.chats.indexOf(userThis._id + '|0')+' USER1: '+user.chats.indexOf(userThis._id + '|1'));
                        if (userThis.chats.indexOf(user._id + '|0') < 0 & userThis.chats.indexOf(user._id + '|1') < 0) {
                            userThis.chats.push(user._id + '|0');
                            // console.log('Добавляю userthis 0');
                        }
                        if (user.chats.indexOf(userThis._id + '|0') < 0 & user.chats.indexOf(userThis._id + '|1') < 0) {
                            user.chats.push(userThis._id + '|1');
                            // console.log('Добавляю user 0');
                        }

                        userThis.chats.splice(userThis.chats.indexOf(user._id + '|0'), 1);
                        // console.log('Удаляю userthis 0');

                        if (user.chats.indexOf(userThis._id + '|1') < 0) {
                            // console.log('user 0: ' + user.chats.indexOf(userThis._id + '|0'));
                            // console.log('Удаляю user 0 ');
                            user.chats.splice(user.chats.indexOf(userThis._id + '|0'), 1);

                        } else {
                            // console.log(user.chats.indexOf(userThis._id + '|1'));
                            // console.log('user 1: '+user.chats[user.chats.indexOf(userThis._id + '|1')]);
                            user.chats.splice(user.chats.indexOf(userThis._id + '|1'), 1);
                            // console.log('Удаляю user 1');
                        }


                        userThis.chats.unshift(user._id + '|0');
                        // console.log('Добавляю userthis 0');
                        user.chats.unshift(userThis._id + '|1');
                        // console.log('Добавляю user 1');

                        userThis.save();
                        user.save();

                        // io.sockets.emit('message accept', username, text, userid);
                        for (var i = 0; i < connectedUsers[userid].length; i++) {
                            // console.log('test')
                            connectedUsers[userid][i].emit('private mess send', { mess: docs.text, username: username, userid: userid });
                            // console.log(i+" me");
                        }
                        if (!connectedUsers[docs.userId]) return;
                        for (var i = 0; i < connectedUsers[docs.userId].length; i++) {
                            connectedUsers[docs.userId][i].emit('private mess send', { mess: docs.text, username: username, userid: userid });
                            // console.log(i+" another");
                        }
                    });
                });
            })


            // connectedUsers[userid][0].emit('private mess send', { mess: docs.text, username: username, userid: userid });
        })

        socket.on('message send', (text, callback) => {
            var newMsg = new Message({ nickname: username, msg: text, id: userid });
            newMsg.save(function (err) {
                if (err) throw err;
                io.sockets.emit('message accept', username, text, userid);
            })
            // callback && callback(text);
        });

        socket.on('disconnect', () => {
            // updateClients(io, socket, onlineUsers);


            socket.broadcast.emit('leave', username);
            onlineUsers.splice(onlineUsers.indexOf(user), 1);

            connectedUsers[userid].splice(connectedUsers[userid].indexOf(socket), 1);

            // console.log()

            // console.log(onlineUsers);
            // socket.broadcast.emit('push online', onlineUsers);
            // socket.emit('push online', onlineUsers);
            // setTimeout(console.log(onlineUsers), 1000);
        });
    });

    return io;
};

module.exports = socket;