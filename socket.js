

const jwt = require('jsonwebtoken');
const config = require('config')
const {ObjectId} = require('mongoose').Types
const User = require("./models/User")
const Message = require("./models/Message")

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
        socket.emit("load_user_info",{username:user.username,avatar:user.avatar,userId:socket.userId,status:user.status})
        let messages = await Message.find({chat:'community'}).exec();
        // messages = messages.sort(function(a,b){
        //     return new Date(b.created) - new Date(a.created);
        // })
        // console.log(messages)
        socket.emit('load_messages', messages);

        // console.log(user.username,'connected')
        socket.join(socket.userId);
        socket.join('community')
        socket.on('logout',() => {
            socket.in(socket.userId).emit("reload")
        })
        socket.on('send_message',({text,username,userId,chat})=>{
            // console.log(username,text)
            io.in(chat).emit('push_message',{text,username,userId,chat})
            let message = new Message({username,userId,text,chat})
            message.save()
        })
        socket.on('send_typing_on',({username,chat})=>{
            // console.log(username,chat,'typing...')
            io.in(chat).emit('push_typing_on',{username,chat})
            // io.in(chat).emit('push_message',{text,username,userId,chat})
        })
        socket.on('send_typing_off',({username,chat})=>{
            // console.log(username,chat,'off typing...')
            io.in(chat).emit('push_typing_off',{username,chat})
        })
        socket.on('change_status',async ({status})=>{
            const user = await User.findOne({_id: new ObjectId(socket.userId)})
            // console.log(socket.userId,'change_status',status)
            user.status = status
            user.save()
        })




        socket.on('disconnect', () => {
            console.log(user.username,'disconnected')
            // io.emit('push_typing_off',user.username)
        });
    })
    
    return io
}

module.exports = socket