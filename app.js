// Based off
// https://acidtango.com/thelemoncrunch/how-to-implement-a-video-conference-with-webrtc-and-node/

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use('/', express.static('public'))

module.exports = app;

let clientsDict = {};

io.on('connection', (socket) => {
  socket.on('join', (roomId) => {
    let roomClients = clientsDict[roomId]

    if (!roomClients){
      roomClients = 0
    }

    console.log(roomClients)

    if (roomClients == 0) {
      console.log('Creating room ' + roomId + ' and emitting room_created socket event')
      socket.join(roomId)
      socket.emit('room_created', roomId)
      clientsDict[roomId] = 1
      hostTimer(socket, roomId);
    } else if (roomClients == 1) {
      console.log('Joining room ' + roomId + ' and emitting room_joined socket event')
      socket.join(roomId)
      socket.emit('room_joined', roomId)
      clientsDict[roomId] = 2
    } else {
      console.log("Can't join room " + roomId + ", emitting full_room socket event")
      socket.emit('full_room', roomId)
    }
  })
  

  socket.on('start_call', (roomId) => {
    console.log('Broadcasting start_call event to peers in room ' + event.roomId)
    socket.broadcast.to(roomId).emit('start_call')
  })
  socket.on('webrtc_offer', (event) => {
    console.log('Broadcasting webrtc_offer event to peers in room ' + event.roomId)
    socket.broadcast.to(event.roomId).emit('webrtc_offer', event.sdp)
  })
  socket.on('webrtc_answer', (event) => {
    console.log('Broadcasting webrtc_answer event to peers in room ' + event.roomId)
    socket.broadcast.to(event.roomId).emit('webrtc_answer', event.sdp)
  })
  socket.on('webrtc_ice_candidate', (event) => {
    console.log('Broadcasting webrtc_ice_candidate event to peers in room ' + event.roomId)
    socket.broadcast.to(event.roomId).emit('webrtc_ice_candidate', event)
  })
  socket.on("peerDisconnected", (roomId) => {
    console.log("Peer left room " + roomId);
    clientsDict[roomId] = 1;
  })
})

function sleep(minutes) {
  ms = minutes * 60 * 1000;
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function hostTimer(socket, roomId){

  // timeout for a single call is 5 minutes.
  await sleep(5);
  socket.emit("close");
  clientsDict[roomId] = 0;

}

const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log('Express server listening on port ' + port);
});