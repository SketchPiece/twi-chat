const {Schema,model} = require('mongoose')

const schema = new Schema({
    created: { 
        type: Date, 
        default: Date.now 
    }
})

module.exports = model('Chat',schema)