const jwt = require('jsonwebtoken');
const config = require('config')
const {ObjectId} = require('mongoose').Types
const User = require("./models/User")
const Message = require('./models/Message')
const FriendRequest = require('./models/FriendRequest')
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
        const updateFriendRequests = async (userId) =>{
            let friendRequests = await FriendRequest.find({to:userId})
            let pushRequests = []

            for(let i = 0;i<friendRequests.length;i++){
                let user = await User.findOne({_id: new ObjectId(friendRequests[i].from)})
                pushRequests.push({username: user.username,userId:friendRequests[i].from})
            }

            io.in(userId).emit('push_friend_requests',pushRequests)
        }
        const updateFriends = async (userId) =>{
            let user = await User.findOne({_id: new ObjectId(userId)})
            let friends = user.friends
            let pushFriends = []

            for(let i = 0;i<friends.length;i++){
                let friend = await User.findOne({_id: new ObjectId(friends[i])})
                pushFriends.push({username: friend.username,avatar: friend.avatar,userId:friends[i]})
            }

            io.in(userId).emit('push_friends',pushFriends)
        }
        if(socket.authError) return socket.emit('logout')
        const user = await User.findOne({_id: new ObjectId(socket.userId)})
        socket.emit("load_user_info",{username:user.username,avatar:user.avatar,userId:socket.userId,status:user.status,tag:user.tag})
        let messages = await Message.find({chat:'community'}).exec();
        messages = messages.slice(messages.length-250)

        let avatarsСache = {}
        let messagesWithAvatars = []
        for(let i = 0;i<messages.length;i++){
            if(!avatarsСache[messages[i].userId]){
                let user = await User.findOne({_id: new ObjectId(messages[i].userId)})
                avatarsСache[messages[i].userId] = user.avatar
            }
            
            messagesWithAvatars.push({username: messages[i].username,userId:messages[i].userId,text:messages[i].text,avatar:avatarsСache[messages[i].userId]})
        }

        socket.emit('load_messages', messagesWithAvatars);

        socket.join(socket.userId);
        socket.join('community')
        socket.on('logout',() => {
            socket.in(socket.userId).emit("reload")
        })
        socket.on('send_message',({text,username,userId,avatar,chat})=>{
            io.in(chat).emit('push_message',{text,username,userId,avatar,chat})
            let message = new Message({username,userId,text,chat})
            message.save()
        })
        socket.on('send_typing_on',({username,chat})=>{
            io.in(chat).emit('push_typing_on',{username,chat})
        })
        socket.on('send_typing_off',({username,chat})=>{
            io.in(chat).emit('push_typing_off',{username,chat})
        })
        socket.on('update_status',async ({status})=>{
            const user = await User.findOne({_id: new ObjectId(socket.userId)})
            user.status = status
            user.save()
        })
        socket.on('update_avatar',async ({avatar})=>{
            const user = await User.findOne({_id: new ObjectId(socket.userId)})
            user.avatar = avatar
            user.save()
        })
        socket.on('delete_avatar', async ({avatar})=>{
            let public_id = avatar.split('/')[1].split('.')[0]
            cloudinary.uploader.destroy(public_id);
        })
        socket.on('get_other_user', async ({userId})=>{
            try{
                const user = await User.findOne({_id: new ObjectId(userId)})
                if(!user) return io.in(socket.userId).emit('push_other_user',{exist:false,userId})
                let friends = user.friends
                let pushFriends = []

                for(let i = 0;i<friends.length;i++){
                    let friend = await User.findOne({_id: new ObjectId(friends[i])})
                    pushFriends.push({username: friend.username,avatar: friend.avatar,userId:friends[i]})
                }
                io.in(socket.userId).emit('push_other_user',{exist:true,userId,username:user.username,status:user.status,avatar:user.avatar,tag:user.tag,friends:pushFriends})
            }catch{
                io.in(socket.userId).emit('push_other_user',{exist:false,userId})
            }
            
        })
        socket.on('add_friend',async ({friendId})=>{
            let friendIsExist = await FriendRequest.findOne({from:friendId,to:socket.userId})
            if(friendIsExist) return console.log('request is exist')

            let friendRequest = await FriendRequest.findOne({from:socket.userId,to:friendId})
            if(!friendRequest){
                friendRequest = new FriendRequest({from:socket.userId,to:friendId})
                await friendRequest.save()
                return updateFriendRequests(friendId)
            }
        })
        socket.on('delete_friend',async ({friendId})=>{
            let user = await User.findOne({_id: new ObjectId(socket.userId)})
            let friend = await User.findOne({_id: new ObjectId(friendId)})
            user.friends.pop(new ObjectId(friendId))
            friend.friends.pop(new ObjectId(socket.userId))
            await user.save()
            await friend.save()
            updateFriends(friendId)
        })
        socket.on('get_friend_requests',async ()=>{
            updateFriendRequests(socket.userId)
        })
        socket.on('get_friends',async ()=>{
            updateFriends(socket.userId)
        })
        socket.on('request_handler',async ({userId,accept})=>{
            let request = await FriendRequest.findOne({from:userId,to:socket.userId})
            if(request) request.remove()
            if(accept && request){
                let user = await User.findOne({_id: new ObjectId(socket.userId)})
                let friend = await User.findOne({_id: new ObjectId(userId)})
                user.friends.push(new ObjectId(userId))
                friend.friends.push(new ObjectId(socket.userId))
                await user.save()
                await friend.save()

                let friends = user.friends
                let pushFriends = []

                for(let i = 0;i<friends.length;i++){
                    let friend = await User.findOne({_id: new ObjectId(friends[i])})
                    pushFriends.push({username: friend.username,avatar: friend.avatar,userId:friends[i]})
                }
                io.in(userId).emit('push_other_user',{exist:true,userId:socket.userId,username:user.username,status:user.status,avatar:user.avatar,tag:user.tag,friends:pushFriends})
            }
            updateFriends(socket.userId)
            updateFriends(userId)

            updateFriendRequests(socket.userId)

            
        })




        socket.on('disconnect', () => {

        });
    })
    
    return io
}

module.exports = socket