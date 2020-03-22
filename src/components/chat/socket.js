import io from 'socket.io-client'

//socket.io 


const socket = io('http://118.25.79.235:8078', {
    path: '/ws',
    transports: ['websocket']
});
export default socket;