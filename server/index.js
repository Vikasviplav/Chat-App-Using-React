const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();
const port = 4500 || process.env.PORT; // for testing
// const port = process.env.PORT; // for production

const users = [{}];
app.use(cors());
app.get("/", (req, res) => {
    res.send("it's working...");
})

const server = http.createServer(app);

const io = socketIo(server); // for connection

io.on("connection", (socket) => {

    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        socket.broadcast.emit('userJoined',{user:"Admin",message: `${users[socket.id]} joined the chat`});
        //socket.broadcast.emit('welcome', { user: "Admin", message: `Welcome to the chat ,${users[socket.id]} ` })
    })

    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message, id });
    })

    socket.on("disconnected", () => { // client side working 
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]}  has left` });
        
    })

})

server.listen(port, () => {
    console.log("server is running");
})