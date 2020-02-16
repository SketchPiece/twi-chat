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
        default:"https://cdn.discordapp.com/avatars/578197813821833227/ca27c52873bb1c3ee33aca4fbc0a09bf.png?size=256"
    },
    status:{
        type:String,
        default:""
    }
})

module.exports = model('User',schema)