const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const path = require('path')
const PORT = process.env.PORT || config.get('port')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require("./routes/auth.routes"))

if(process.env.NODE_ENV === 'production'){
    console.log("Подключаю клиента React")
    app.use('/',express.static(path.join(__dirname, 'client', 'build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

async function start(){
    try{
        await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log("MongoDB Connected!")
        let server = require('http').createServer(app)

        server.listen(PORT,()=>{
            console.log(`TwiChat запущен! Порт: ${PORT}`)
        })

        let io = require('./socket')(server)
        app.set('io',io)
    } catch(e){
        console.log('Server Error', e)
        process.exit(1)
    }
}

start()