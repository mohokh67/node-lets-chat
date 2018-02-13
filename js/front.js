var socket = io();

$(() => {
    $('.sendMessage').click(()=>{
        var message = {name: $('.messengerName').val(), message: $('.messengerMessage').val()}
        postMessage(message);
    })
    getMessages();
})

socket.on('message', addMessage);

function addMessage(message){
    $('.messages').append(`<h4> ${message.name} </h4> <p> ${message.message}</p>`)
}

function getMessages(){
    // $.get() will not work with jQuery slim version and integrity attr. in script tag
    $.get('/messages', (allMessages) => {
        allMessages.forEach(addMessage);
    })
}

function postMessage(message){
    $.post('/messages', message)
}