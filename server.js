const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const PORT = config.get('port') || 5000

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require("./routes/auth.routes"))


async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log("MongoDB Connected!")

        app.listen(PORT,()=>{
            console.log(`TwiChat запущен! Порт: ${PORT}`)
        })
        
    } catch{
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()