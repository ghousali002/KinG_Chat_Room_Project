const socket = io()
let name;
do {
    name = prompt('Please Enter your Name ');
    let n= name;
    if (n != '') {
        socket.emit('username',n);
        n='';
    }
} while (!name);

let msgArea = document.querySelector('.msg_area');
let textarea = document.querySelector(".textarea");
let sendBtn = document.querySelector('.send_button');

sendBtn.addEventListener('click',()=>{
    if (textarea.value!== '') {
        SendMsg(textarea.value);
        textarea.value ='';
    }
})

textarea.addEventListener('keyup',(e)=>{
    if (e.key == 'Enter') {
        SendMsg(e.target.value);
        textarea.value ='';
    }
});




function SendMsg(msg) {
    let messg = {
        user : name,
        message: msg.trim()
    }
    AppendMsg(messg,'outgoing_msg');
    msgArea.scrollTop = msgArea.scrollHeight;
    socket.emit('send_msg',messg);
    
}

function AppendMsg(msg,type) {
    let outgoingDiv = document.createElement('div');
    outgoingDiv.classList.add(type,'msg');
    let data =`<h4>${msg.user}</h4><p>${msg.message}</h4>`
    outgoingDiv.innerHTML = data;
    msgArea.appendChild(outgoingDiv);
    
}


socket.on('recieve_msg', (msg)=>{
    AppendMsg(msg,'incoming_msg');
    msgArea.scrollTop = msgArea.scrollHeight;
});