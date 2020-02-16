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
        default:"/images/default.png"
    },
    status:{
        type:String,
        default:""
    }
})

module.exports = model('User',schema)