

var jwt = require('jsonwebtoken');
const config = require('config')

const socket = (server) => {
    const io = require('socket.io')(server, {
        'origins': ['*:*', '*:*']
    })
    .use(function(socket, next){
         

        if (socket.handshake.query && socket.handshake.query.token){
            
            jwt.verify(socket.handshake.query.token, config.get('jwtSecret'), function(err, decoded) {
                if(err) {
                    console.log("jwt кончился")
                    socket.emit("logout")
                    return next(new Error('Authentication error'))
                }
                socket.userId = decoded.userId
                next()
            })
        } else {
            next(new Error('Authentication error'))
        } 
        // console.log(socket.handshake)   
      })
    .on('connection',(socket)=>{
        console.log("Socket Id:",socket.id);
        console.log(socket.userId)
        socket.join(socket.userId);
        socket.on('logout',()=>{
            socket.in(socket.userId).emit("reload")
            // console.log(socket.userId,"logout")
        })
        // socket.on('hi',()=>{
        //     console.log("hi")
        // })

    })
    

    return io
}

module.exports = socket