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

    // These events are emitted only to the sender socket.
    if (roomClients == 0) {
      console.log(`Creating room ${roomId} and emitting room_created socket event`)
      socket.join(roomId)
      socket.emit('room_created', roomId)
      clientsDict[roomId] = 1
    } else {
      console.log(`Joining room ${roomId} and emitting room_joined socket event`)
      socket.join(roomId)
      socket.emit('room_joined', roomId)
      clientsDict[roomId] = clientsDict[roomId] + 1
    } 
  })

//   else if (roomClients == 1) {
//     console.log(`Joining room ${roomId} and emitting room_joined socket event`)
//     socket.join(roomId)
//     socket.emit('room_joined', roomId)
//     clientsDict[roomId] = clientsDict[roomId] + 1
//   } else {
//     console.log(`Can't join room ${roomId}, emitting full_room socket event`)
//     socket.emit('full_room', roomId)
//   }
// })

  // These events are emitted to all the sockets connected to the same room except the sender.
  socket.on('start_call', (roomId) => {
    console.log(`Broadcasting start_call event to peers in room ${roomId}`)
    socket.broadcast.to(roomId).emit('start_call')
  })
  socket.on('webrtc_offer', (event) => {
    console.log(`Broadcasting webrtc_offer event to peers in room ${event.roomId}`)
    socket.broadcast.to(event.roomId).emit('webrtc_offer', event.sdp)
  })
  socket.on('webrtc_answer', (event) => {
    console.log(`Broadcasting webrtc_answer event to peers in room ${event.roomId}`)
    socket.broadcast.to(event.roomId).emit('webrtc_answer', event.sdp)
  })
  socket.on('webrtc_ice_candidate', (event) => {
    console.log(`Broadcasting webrtc_ice_candidate event to peers in room ${event.roomId}`)
    socket.broadcast.to(event.roomId).emit('webrtc_ice_candidate', event)
  })
})

// START THE SERVER =================================================================
const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
