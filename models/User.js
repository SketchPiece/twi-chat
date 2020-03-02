const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"v1581973009/w1xcn5v6tl80hw72lpts.png"
    },
    status:{
        type:String,
        default:""
    },
    friends:{
        type:[Types.ObjectId],
        ref: 'User'
    },
    tag:{
        type:String,
        default:""
    },
    chats:{
        type:Object,
        default:{}
        // of:String,
        // ref: 'Chat'
    }
})

module.exports = model('User',schema)