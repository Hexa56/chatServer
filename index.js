const express = require('express');
const app = express();
const http = require('http')
const {Server} = require("socket.io")
const cors = require("cors");

app.use(cors());
const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin: "https://chat-client-jhb.vercel.app",
        methods: ['GET', 'POST']
    }
});
let Users = [];
io.on('connection', (socket) => {
    console.log(`User Id ${socket.id}`);
    socket.emit("user_id",socket.id)
    socket.on("join", (data) => {
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("recived_message", data)
    })
})

server.listen(3001, ()=>{
    console.log("server is running")
})
