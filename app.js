// Group Project 2021 UG6
//
// The code in this file is based off the tutorial hosted on acidtango.com.
// https://acidtango.com/thelemoncrunch/how-to-implement-a-video-conference-with-webrtc-and-node/
//
// Code added by students in UG6 for the Cloud Computing module is included near the start of the document.
// This is indicated by a line of asterisks.
// 

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use('/', express.static('public'))

module.exports = app;


// @ Attributed to Dan Dascalescu
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



// *************************************
// Start of code added by us for Cloud Computing 


// Holds a list of roomIDs and the number of clients in each
let clientsDict = {};


// starts a timer that closes every call after 5 minutes to free up the roomID for other users.
async function hostTimer(socket, roomId){

  // Timeout for a single call is 5 minutes.
  await sleep(5000 * 60);
  socket.emit("close");
  clientsDict[roomId] = 0;

}

// Created to track of the number of clients in each room.
function getNumberInRoom(roomID){

  let roomClients = clientsDict[roomID];
  if (!roomClients){
    roomClients = 0;
  }

  return roomClients

}

function addDisconnectListener(socket){
  socket.on("peerDisconnected", (roomID) => {
    console.log("Peer left room " + roomID);
    clientsDict[roomID] = 1;
  })
}


// ******************************************
// End of code added by us for Cloud Computing 




// Listen for connections
io.on('connection', (socket) => {
  socket.on('join', (roomID) => {

    // Getting people in each room is implemented differently here by us than in the tutorial code.
    roomClients = getNumberInRoom(roomID);
    
    console.log((roomClients + 1) + " people in " + roomID);

    if (roomClients == 0) {
      console.log('Creating room ' + roomID + ' and emitting room_created socket event')
      socket.join(roomID)
      socket.emit('room_created', roomID)
      clientsDict[roomID] = 1
      hostTimer(socket, roomID);
    } else if (roomClients == 1) {
      console.log('Joining room ' + roomID + ' and emitting room_joined socket event')
      socket.join(roomID)
      socket.emit('room_joined', roomID)
      clientsDict[roomID] = 2
    } else {
      console.log("Can't join room " + roomID + ", emitting full_room socket event")
      socket.emit('full_room', roomID)
    }
  })
  
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
  addDisconnectListener(socket);
})


// Start the server
const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log('Express server listening on port ' + port);
});