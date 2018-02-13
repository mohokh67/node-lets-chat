var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json()) // Parse the body from get request
app.use(bodyParser.urlencoded({extended: false})) // Parse the body of post request from jQuery


var messages = [
    { name: 'moho', message: 'Hi'},
    { name: 'Habib', message: 'Hello'}
];
// Routes
app.get('/messages', (request, response) =>{
    response.send(messages)
})

app.post('/messages', (request, response) => {
    messages.push(request.body);
    io.emit('message', request.body);
    response.sendStatus(200);
})

io.on('connection', (socket) => {
    console.log('user connected')
})

var server = http.listen(3002, () => { // in browser: http://localhost:3000/
    console.log('Server is listening on port', server.address().port)
});
