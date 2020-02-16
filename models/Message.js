const {Schema,model,Types} = require('mongoose')
// const {ObjectId} = require('mongoose')

const schema = new Schema({
    username:{
        type:String,
        required:true
    },
    userId:{
        type: Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        required:true
    },
    chat:{
        type:String,
        required:true
    },
    created: { 
        type: Date, 
        default: Date.now 
    }
})

module.exports = model('Message',schema)