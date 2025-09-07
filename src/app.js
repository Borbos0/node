require('dotenv').config();

const http = require('http')
const getUsers = require('./modules/users')
const getHello = require('./modules/hello')

const PORT = process.env.PORT
const HOST = process.env.HOST

const server = http.createServer((request, response) => {
    const url = request.url

    if (url.startsWith('/users')) {
    response.status = 200;
    response.statusMessage = "OK"
    response.header = "Content-Type: application/json"
    response.write(getUsers())
    response.end();

    return;
    }

    if (url.startsWith('/hello')) {
    response.status = 200
    response.header = "Content-Type: text/plain"
    response.write(getHello(url))
    response.end()
    return
  }

    response.status = 200;
    response.statusMessage = "OK"
    response.header = "Content-Type: text/plain"
    response.write("Hello, world")
    response.end();
    
})

server.listen(PORT, HOST, () => {
    console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`)
})