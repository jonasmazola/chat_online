const express = require('express')
const app = express()

// carrega os arquiuvos estaticos da pasta public
app.use(express.static('public'))

const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)

const porta = 8000



http.listen(porta, () => {
    console.log('servidor iniciado: http://localhost:' + porta)
})




// redireciona para index, quando o usuario acessa a raiz
app.get('/', (req, resp) => {
    resp.sendFile(__dirname + '/index.html')
})



serverSocket.on('connection', (socket) => {


    socket.on('login', (name) => {
        console.log('cliente: ' + name)
        serverSocket.emit('chat msg', `O usuario ${name} conectou`)
        socket.nickName = name
    })

    socket.on('chat msg', (msg) => {
        console.log(`O cliente ID: ${socket.nickName} enviou a mensagem: ${msg}`)
        serverSocket.emit('chat msg', msg, socket.nickName)
    })


    socket.on('Digitando', (msg_status) => {
        socket.broadcast.emit('Digitando', msg_status)
        console.log(msg_status)
    })



})