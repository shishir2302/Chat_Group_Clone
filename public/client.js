const socket = io();
const sendInp =document.getElementById('sendInp')
const form = document.getElementById('send-container')
const messageInput =document.getElementById('messageInp')
const allMess = document.querySelector('.container')


const appened =(message,position)=>{
const d= document.createElement('div');
d.innerText = message;
d.classList.add('message',position);
// d.classList.add(position);
allMess.append(d)
    
}


const name=prompt("Enter your name please!!")
socket.emit('new-user-join', name)

socket.on('user-join', name=>{
    appened(`${name} join the chat`, 'right')
})

socket.on('receive', data=>{
        appened( `${data.name}:${data.message}` , 'left')
    
    })
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        const message = messageInput.value;
        // appened(`you : ${message}`, 'right')
        socket.emit('send', message)
        messageInput.value = ''
    });