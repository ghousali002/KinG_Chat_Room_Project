const { Console } = require('console');
const express = require('express');
const app = express()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000
const io= require('socket.io')(http)


http.listen(PORT , ()=>{
    console.log(`Listening on port: ${PORT}`)

});
app.use(express.static(__dirname))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
});


let user_count =0;
io.on('connection',(socket)=>{
    socket.on('username',(name)=>{
        console.log(`User ${++user_count} ${name} connected with Server...`)
    })
    socket.on('send_msg',(msg)=>{
        socket.broadcast.emit('recieve_msg',msg)
    });
});
