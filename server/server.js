const Koa = require('koa');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('@koa/cors');

const app = new Koa();
app.use(cors());
const server = http.createServer(app.callback());
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const SERVER_HOST = '0.0.0.0';
const SERVER_PORT = 8080;


io.on('connection', socket => {
    console.log('[IO]New connection');
    socket.on('chat.message', message => {
        console.log('[IO]New message received: ', message);
        io.emit('chat.message', message);
    });
    socket.on('disconnect', () => console.log('[IO]Connection closed'));
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listening on http://${SERVER_HOST}:${SERVER_PORT}`);
    console.log(`[HTTP] Press CTRL+C to stop`);
});
