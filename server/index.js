const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
    // options
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {
    console.log(`Socket Connection ${socket.id}...`);

    socket.broadcast.emit("user connected", {
        socketId: socket.id,
        socketUser: socket.username,
    });

    socket.on('message', (data) => {
        socket.emit('message-client', data);
        socket.broadcast.emit('message-client', data);
    })
});

const port = 3011;
httpServer.listen(port, () => {
    console.log(`erver run port: ${port}`);
});