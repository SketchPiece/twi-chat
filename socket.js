const jwt = require('jsonwebtoken');
const config = require('config')
const {ObjectId} = require('mongoose').Types
const User = require("./models/User")
const Message = require('./models/Message')
const FriendRequest = require('./models/FriendRequest')
const Chat = require('./models/Chat')

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
        // console.log(socket.userId,socket.id)
        const user = await User.findOne({_id: new ObjectId(socket.userId)})
        if(!user) return socket.emit('logout')
        socket.emit("load_user_info",{username:user.username,avatar:user.avatar,userId:socket.userId,status:user.status,tag:user.tag})
        let messages = await (await Message.find({chat:'community'}).sort('-created').limit(25).exec()).reverse();
        // messages = messages.slice(messages.length-7)
        // messages.length = Math.min(messages.length, 7);

        let avatarsСache = {}
        let messagesWithAvatars = []
        for(let i = 0;i<messages.length;i++){
            if(!avatarsСache[messages[i].userId]){
                let user = await User.findOne({_id: new ObjectId(messages[i].userId)})
                avatarsСache[messages[i].userId] = user.avatar
            }
            
            messagesWithAvatars.push({id:messages[i]._id,username: messages[i].username,userId:messages[i].userId,text:messages[i].text,avatar:avatarsСache[messages[i].userId]})
        }
        // console.log()
        let chats = []
        let chatLasts = []

        for(chat in user.chats){
            let userChat = await User.findOne({_id: new ObjectId(chat)})
            let userChatLast = await Message.find({chat:user.chats[chat]}).sort('-created').exec()
            // console.log()

            if(userChatLast||userChatLast.length>0) chatLasts.push({id:userChatLast[0]._id,username: userChatLast[0].username,userId:userChatLast[0].userId,text:userChatLast[0].text,avatar:userChat.avatar,chatId:user.chats[chat]})
            chats.push({userId:chat,chatId:user.chats[chat], username:userChat.username,avatar:userChat.avatar})
        }
        

        socket.emit('load_info', {messages:messagesWithAvatars,chatButtonsPush:chats,lasts:chatLasts});

        socket.join(socket.userId);
        socket.join('community');
        if(user.chats){
            for(chat in user.chats){
                chats.push(chat)
                socket.join(user.chats[chat]);
            }
        }
        // let user = '' 

        socket.on('logout',() => {
            socket.in(socket.userId).emit("reload")
        })
        socket.on('send_message',async ({text,username,userId,avatar,chat,sendTo})=>{
            // console.log(username,text,chat)
            let message = new Message({username,userId,text,chat})
            // console.log(userId,'=>',sendTo)
            // let chatsRefresh = false
            // if(!chat=='community'){
            //     let user = await User.findOne({_id: new ObjectId(socket.userId)})
            //     let chats = []

            //     for(chat in user.chats){
            //         let userChat = await User.findOne({_id: new ObjectId(chat)})
            //         chats.push({userId:chat,chatId:user.chats[chat], username:userChat.username})
            //     }
            //     chatsRefresh = chats
                
            //     io.sockets.clients()
            //     console.log('in if chats',chats)
            // }
            // console.log('out if chats',chatsRefresh)
            // user.chats[chat]

            // if(chat !== 'community'){
            //     console.log(userId,'=>',sendTo)
            // }

            io.in(chat).emit('push_message',{id:message._id,text,username,userId,avatar,chat})
            
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
                if(!user) return socket.emit('push_other_user',{exist:false,userId})
                let friends = user.friends
                let pushFriends = []

                for(let i = 0;i<friends.length;i++){
                    let friend = await User.findOne({_id: new ObjectId(friends[i])})
                    pushFriends.push({username: friend.username,avatar: friend.avatar,userId:friends[i]})
                }
                socket.emit('push_other_user',{exist:true,userId,username:user.username,status:user.status,avatar:user.avatar,tag:user.tag,friends:pushFriends})
            }catch{
                socket.emit('push_other_user',{exist:false,userId})
            }
            
        })
        socket.on('add_friend',async ({friendId})=>{
            let user = await User.findOne({_id: new ObjectId(socket.userId)})
            if(user.friends.includes(new ObjectId(friendId))) return
            let friendIsExist = await FriendRequest.findOne({from:friendId,to:socket.userId})

            if(friendIsExist) {
                friendIsExist.remove()
                
                let friend = await User.findOne({_id: new ObjectId(friendId)})

                if(!user.friends.includes(new ObjectId(friendId))) user.friends.push(new ObjectId(friendId))
                if(!friend.friends.includes(new ObjectId(socket.userId))) friend.friends.push(new ObjectId(socket.userId))
                await user.save()
                await friend.save()

                let friends = user.friends
                let pushFriends = []

                for(let i = 0;i<friends.length;i++){
                    let friend = await User.findOne({_id: new ObjectId(friends[i])})
                    pushFriends.push({username: friend.username,avatar: friend.avatar,userId:friends[i]})
                }
                socket.emit('push_other_user',{exist:true,userId:socket.userId,username:user.username,status:user.status,avatar:user.avatar,tag:user.tag,friends:pushFriends})
                return
            }

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
            //
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

                if(!user.friends.includes(new ObjectId(userId))) user.friends.push(new ObjectId(userId))
                if(!friend.friends.includes(new ObjectId(socket.userId))) friend.friends.push(new ObjectId(socket.userId))
                await user.save()
                await friend.save()

                let friends = user.friends
                let pushFriends = []

                for(let i = 0;i<friends.length;i++){
                    let friend = await User.findOne({_id: new ObjectId(friends[i])})
                    pushFriends.push({username: friend.username,avatar: friend.avatar,userId:friends[i]})
                }
                socket.emit('push_other_user',{exist:true,userId:socket.userId,username:user.username,status:user.status,avatar:user.avatar,tag:user.tag,friends:pushFriends})
            }
            updateFriends(socket.userId)
            updateFriends(userId)

            updateFriendRequests(socket.userId)
        })
        socket.on('load_more_messages',async ({next,chat})=>{
            let messages = await (await Message.find({chat:chat}).sort('-created').skip(25*next).limit(25).exec()).reverse();

            let avatarsСache = {}
            let messagesWithAvatars = []
            for(let i = 0;i<messages.length;i++){
                if(!avatarsСache[messages[i].userId]){
                    let user = await User.findOne({_id: new ObjectId(messages[i].userId)})
                    avatarsСache[messages[i].userId] = user.avatar
                }
                
                messagesWithAvatars.push({id:messages[i]._id,username: messages[i].username,userId:messages[i].userId,text:messages[i].text,avatar:avatarsСache[messages[i].userId]})
            }
            socket.emit('push_more_messages', {messages:messagesWithAvatars,isFinish:messagesWithAvatars.length<=0,chat});
        })  
        socket.on('get_chat_messages',async ({userId}) => {
            try{
                let talker = await User.findOne({_id: new ObjectId(userId)})
                if(!talker) return socket.emit('push_chat_messages',{status:false})
                let user = await User.findOne({_id: new ObjectId(socket.userId)})
                let chatId = user.chats[userId]
                if(!chatId) {
                    if(userId===socket.userId) return socket.emit('push_chat_messages',{chatId:null,status:false})
                    let createdChat = await new Chat()
                    chatId = createdChat._id.toString()
                    // console.log('не существует')
                    user.chats[userId] = chatId
                    talker.chats[socket.userId] = chatId

                    user.markModified('chats')
                    talker.markModified('chats')
///
                    user.save()
                    talker.save()
                    createdChat.save()
///

                    // socket.join(chatId)
                    // let clients = io.in(socket.userId).sockets

                    // console.log('id',socket.id)
                    // console.log('CHAT_ID',chatId)

                    let userSockets = io.adapter.rooms[socket.userId].sockets
                    // console.log('userS/ockets',userSockets)
                    for(let user in userSockets){
                        io.connected[user].join(chatId)
                        // console.log(user)
                    }
                    let talkerSockets = io.adapter.rooms[userId].sockets
                    // console.log('talkerSockets',talkerSockets)
                    for(let talker in talkerSockets){
                        io.connected[talker].join(chatId)
                        // console.log(talker)
                    }
                    // console.log(io.adapter.rooms[chatId])

                    io.in(chatId).emit('update_chat_buttons',{userIds:[socket.userId,userId],chatId, usernameIds:[user.username,talker.username],avatars:[user.avatar,talker.avatar]})
                    // io.in(socket.userId).emit('update_chat_buttons',{userIds:[socket.userId,userId],chatId, usernameIds:[user.username,talker.username]})


                    // console.log('rooms',io.adapter.rooms)
                    // io.adapter.rooms[socket.userId].sockets.join(chatId)
                    // console.log(socket)
                    // let clients = io.rooms[socket.userId].sockets
                    // for(let clientId in clients){
                    //     console.log(clientId)
                    // }
                    // console.log(   )
                    // console.log()
                    
                }
                // console.log(createdChat)
                // let messages = await (await Message.find({chat:chatId}).sort('-created').skip(25*next).limit(25).exec()).reverse();
                let messages = await (await Message.find({chat:chatId}).sort('-created').limit(25).exec()).reverse();
                // console.log(chatId)

                let avatarsСache = {}
                let messagesWithAvatars = []
                for(let i = 0;i<messages.length;i++){
                    if(!avatarsСache[messages[i].userId]){
                        let user = await User.findOne({_id: new ObjectId(messages[i].userId)})
                        avatarsСache[messages[i].userId] = user.avatar
                    }
                    
                    messagesWithAvatars.push({id:messages[i]._id,username: messages[i].username,userId:messages[i].userId,text:messages[i].text,avatar:avatarsСache[messages[i].userId]})
                }
                socket.emit('push_chat_messages',{chatId,status:true,messages:messagesWithAvatars,userId})
            }catch(e){
                console.log(e)
                return socket.emit('push_chat_messages',{chatId:null,status:false})
            }

        })




        socket.on('disconnect', () => {

        });
    })
    
    return io
}

module.exports = socket