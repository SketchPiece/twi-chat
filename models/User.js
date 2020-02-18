const {Schema,model} = require('mongoose')

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
    tag:{
        type:String,
        default:""
    }
})

module.exports = model('User',schema)