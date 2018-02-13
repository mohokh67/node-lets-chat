var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json()) // Parse the body from get request
app.use(bodyParser.urlencoded({extended: false})) // Parse the body of post request from jQuery

var dbURL = 'mongodb://root:root@ds235388.mlab.com:35388/nodejs-chat';

var Message = mongoose.model('Message', {
    name: String,
    message: String
})
/*
var messages = [
    { name: 'moho', message: 'Hi'},
    { name: 'Habib', message: 'Hello'}
];
*/

// Routes
app.get('/messages', (request, response) =>{
    Message.find({}, (error, messages) =>{
        response.send(messages)
    })
    
})

app.post('/messages', (request, response) => {
    var message = new Message(request.body);

    message.save((error) => {
        if(error){
            sendStatus(500)
        }
        // messages.push(request.body);
        Message.findOne({message: 'fuck'}, (error, censored) =>{
            if(censored){
                console.log('Censored word found', censored);
                Message.remove({__id: censored.id}, (error) => {
                    console.log('Censored messaged removed...', error);
                })
            }
        })
        io.emit('message', request.body); // Emit a new method or event for soket.io
        response.sendStatus(200);
    })
})

io.on('connection', (socket) => {
    console.log('A user connected')
})

mongoose.connect(dbURL, (error) => {
    console.log('DB error', error);
})

var server = http.listen(3002, () => { // in browser: http://localhost:3000/
    console.log('Server is listening on port', server.address().port)
});
