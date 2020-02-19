const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
    from:{
        type:Types.ObjectId,
        required:true,
        ref:'User'
    },
    to:{
        type:Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports = model('FriendRequest',schema)