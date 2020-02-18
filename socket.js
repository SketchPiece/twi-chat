

const jwt = require('jsonwebtoken');
const config = require('config')
const {ObjectId} = require('mongoose').Types
const User = require("./models/User")
const Message = require("./models/Message")
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'sketchcorp',
    api_key: '438626993692983',
    api_secret: '3cL6c3Lx_R5OssF7MhboYcO9puM'
})

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
        socket.emit("load_user_info",{username:user.username,avatar:user.avatar,userId:socket.userId,status:user.status,tag:user.tag})
        let messages = await Message.find({chat:'community'}).exec();
        // messages = messages.sort(function(a,b){
        //     return new Date(b.created) - new Date(a.created);
        // })
        // console.log(messages)
        let avatarsСache = {}
        let messagesWithAvatars = []
        // messages.map(async (msg)=>{
        //     if(avatarsСache[msg.userId]){
        //         let user = await User.findOne({_id: new ObjectId(msg.userId)})
        //         console.log(user)
        //         avatarsСache[msg.userId] = user.avatar
        //     }
        //     return {username: msg.username,userId:msg.userId,text:msg.text,avatar:avatarsСache[msg.userId]}
        // })
        for(let i = 0;i<messages.length;i++){
            if(!avatarsСache[messages[i].userId]){
                let user = await User.findOne({_id: new ObjectId(messages[i].userId)})
                // console.log(user)
                avatarsСache[messages[i].userId] = user.avatar
            }
            // console.log(messages[i])
            
            messagesWithAvatars.push({username: messages[i].username,userId:messages[i].userId,text:messages[i].text,avatar:avatarsСache[messages[i].userId]})
        }

        // console.log(messagesWithAvatars)
        socket.emit('load_messages', messagesWithAvatars);

        // console.log(user.username,'connected')
        socket.join(socket.userId);
        socket.join('community')
        socket.on('logout',() => {
            socket.in(socket.userId).emit("reload")
        })
        socket.on('send_message',({text,username,userId,avatar,chat})=>{
            // console.log(username,text)
            // console.log(avatar)
            io.in(chat).emit('push_message',{text,username,userId,avatar,chat})
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
        socket.on('update_status',async ({status})=>{
            const user = await User.findOne({_id: new ObjectId(socket.userId)})
            // console.log(socket.userId,'change_status',status)
            user.status = status
            user.save()
        })
        socket.on('update_avatar',async ({avatar})=>{
            const user = await User.findOne({_id: new ObjectId(socket.userId)})
            // console.log(socket.userId,'change_status',status)
            user.avatar = avatar
            user.save()
        })
        socket.on('delete_avatar', async ({avatar})=>{
            // console.log(avatar)
            let public_id = avatar.split('/')[1].split('.')[0]
            // console.log(public_id)
            cloudinary.uploader.destroy(public_id);
        })
        socket.on('get_other_user', async ({userId})=>{
            // console.log(userId)
            try{
                const user = await User.findOne({_id: new ObjectId(userId)})
                if(!user) return io.in(socket.userId).emit('push_other_user',{exist:false,userId})
                io.in(socket.userId).emit('push_other_user',{exist:true,userId,username:user.username,status:user.status,avatar:user.avatar,tag:user.tag})
            }catch{
                io.in(socket.userId).emit('push_other_user',{exist:false,userId})
            }
            
        })




        socket.on('disconnect', () => {
            // console.log(user.username,'disconnected')
            // io.emit('push_typing_off',user.username)
        });
    })
    
    return io
}

module.exports = socket