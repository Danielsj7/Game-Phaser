const socket = io();

//let btn = document.getElementById('button');

// btn.addEventListener('click', () => {

// })
data = {
    id: socket.id,
    x: 20,
    y: 60
};
socket.emit('login', data)

socket.on('fullSala', (msm) => {
    document.write(msm)
})