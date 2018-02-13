var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json()) // Parse the body from get request
app.use(bodyParser.urlencoded({extended: false})) // Parse the body of post request from jQuery

mongoose.Promise = Promise; // Use the ES6 promise for mongoose promise
var dbURL = 'mongodb://root:root@ds235388.mlab.com:35388/nodejs-chat';

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

// Routes
app.get('/messages', (request, response) =>{
    Message.find({}, (error, messages) =>{
        response.send(messages)
    })
    
})

// Message.remove({__id: '5a83566c4dab7d323ba1fdb6'}, (err) =>{
//     console.log(err);
// });

app.post('/messages', async (request, response) => {
    var message = new Message(request.body);

    var savedMessage = await message.save()
    console.log('saved');
    var censored = await Message.findOne({message: 'fuck'})
    if(censored){
        console.log('Censored word found. It will be deleted from system')
        await Message.remove({_id: censored.id});
    } else {
        io.emit('message', request.body); // Emit a new method or event for soket.io
    }    
    response.sendStatus(200);
   
    // .catch((error) => {
    //     response.sendStatus(500)
    //     return console.error(error);
    // });
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
