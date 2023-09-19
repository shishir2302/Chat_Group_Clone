const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server().listen(server);


const users = {};

///socket.io
io.on('connection', socket => {
    socket.on('new-user-join', name=>{
        console.log('New user join', name)
        users[socket.id]=name;
        io.emit('user-join', name);
        
    });
    socket.on("send",message=>{
        io.emit('receive', {message:message, name: users[socket.id]})

    })
  });



app.use(express.static(path.resolve("./public")))

app.get("/", (req,res)=>{
    return res.sendFile("/public/index.html")
})

server.listen(9000, () => {console.log('listening on *:9000')});