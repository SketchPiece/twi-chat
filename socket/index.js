const config = require('../config/config.json');
const HttpError = require('../error').HttpError;
const sessionStore = require('../libs/sessionStore');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const User = require('../models/user').User;
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
            console.log("Session %s is anonymous", session.id);
            reject();
        }

        // debug("retrieving user ", session.user);
        console.log("retrieving user ", session.user);

        User.findById(session.user).exec((err, user) => {
            if (err) return reject(err);
            if (!user) reject();

            // debug("user findbyId result: " + user);
            console.log("user findbyId result: " + user);
            resolve(user);
        });
    });
};

const checkAuth = (handshake, callback) => {
    handshake.cookies = cookie.parse(handshake.headers.cookie || '');
    const sidCookie = handshake.cookies[config.session.key];
    console.log(sidCookie + ' ' + config.session.secret);
    const sid = cookieParser.signedCookie(sidCookie, config.session.secret);
    // debug(sid);
    console.log(sid + " sid");
    sessionStore.get(sid, (err, session) => {
        // debug(session);
        console.log(session + " session");

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
        console.log('sessreload: ' + sid);
        //console.log(io.sockets);
        io.sockets.clients((err, clients) => {
            if (err) throw err;

            clients.forEach(function(clientId) {
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
    io.on('connection', (socket) => {
        const username = socket.handshake.user.get('username');
        // console.log(onlineUsers.indexOf(username))
        onlineUsers.push(username);

        // console.log(onlineUsers.indexOf(username))
        // consolse.log('------------------------------connnnnnnnnnnnnect');
        // updateClients(io, socket, onlineUsers);
        // setInterval(function() {
        //     updateClients(io, socket, onlineUsers);
        // }, 100);
        socket.on('update online', function() {
            // updateClients(io, socket, onlineUsers);
            console.log(onlineUsers);
            // console.log('отправил');
            io.sockets.emit('push online', onlineUsers);
            // socket.broadcast.emit('push online', onlineUsers);

        })

        socket.emit('join', username);

        socket.on('message', (text, callback) => {
            io.sockets.emit('message', username, text);
            // callback && callback(text);
        });

        socket.on('disconnect', () => {
            // updateClients(io, socket, onlineUsers);


            socket.broadcast.emit('leave', username);
            onlineUsers.splice(onlineUsers.indexOf(username), 1);
            console.log(onlineUsers);
            socket.broadcast.emit('push online', onlineUsers);
            socket.emit('push online', onlineUsers);
            // setTimeout(console.log(onlineUsers), 1000);
        });
    });

    return io;
};

module.exports = socket;