

const jwt = require('jsonwebtoken');
const config = require('config')
const {ObjectId} = require('mongoose').Types
const User = require("./models/User")

const socket = (server) => {
    const io = require('socket.io')(server, {
        'origins': ['*:*', '*:*']
    })
    .use(function(socket, next){
         

        if (socket.handshake.query && socket.handshake.query.token){
            
            jwt.verify(socket.handshake.query.token, config.get('jwtSecret'), function(err, decoded) {
                if(err) {
                    socket.authError = true
                    return next()
                }
                socket.userId = decoded.userId
                next()
            })
        } else {
            socket.authError = true
            next()
        } 
      })
    .on('connection',async (socket)=>{
        if(socket.authError) return socket.emit('logout')
        const user = await User.findOne({_id: new ObjectId(socket.userId)})
        socket.emit("user_info",{username:user.username,avatar:user.avatar,userId:socket.userId})
        console.log(user.username,'connected')
        socket.join(socket.userId);
        socket.join('community')
        socket.on('logout',() => {
            socket.in(socket.userId).emit("reload")
        })
        socket.on('send_message',({text,username,userId,chat})=>{
            // console.log(text,chat)
            io.in(chat).emit('push_message',{text,username,userId})
        })
    })
    
    return io
}

module.exports = socket