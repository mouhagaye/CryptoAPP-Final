const http = require('http')
const app = require('./app')
const port = process.env.PORT || 4000
const server = http.createServer(app)

const io = require('socket.io')(server)

io.on('connection', (socket)=>{
    console.log(`Connecté au client ${socket.id}`);
})
server.listen(port, (req, res)=>{
    console.log(`Stellar test app listening on port ${port}!`);
})

exports.socket = io;