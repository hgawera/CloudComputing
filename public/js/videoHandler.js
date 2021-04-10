// The below code is based off the tutorial hosted on acidtango.com. 
// Exceptions to this where we have added our own code are explicitly stated. @ = created.
// https://acidtango.com/thelemoncrunch/how-to-implement-a-video-conference-with-webrtc-and-node/

const roomSelectionContainer = document.getElementById('room-selection-container')
const roomInputTxt = document.getElementById('room-input')
let roomInput = 0
const connectButton = document.getElementById('connect-button')
const videoChatContainer = document.getElementById('video-chat-container')
const localVideoComponent = document.getElementById('local-video')
const remoteVideoComponent = document.getElementById('remote-video')

// collect homepage classes to remove when a user joins a room.
const homepage = document.getElementsByClassName('homepage')
const info = document.getElementsByClassName('info')
const join = document.getElementsByClassName('join')
const about = document.getElementsByClassName('about bg-primary my-2 py-2')
const video = document.getElementsByClassName('video')

//const io = require('socket.io')(server);

const socket = io();
const mediaConstraints = {
  audio: true,
  video: { width: 1280, height: 720 },
}
let localStream
let remoteStream
let isRoomCreator
let rtcPeerConnection
let roomId


if (String(sessionStorage.getItem("roomID")) != "null"){
  getRoomNumber(sessionStorage.getItem("roomID"));
  console.log(sessionStorage.getItem("roomID"));
  sessionStorage.setItem("roomID", "null");
}

// on the join room buttons, the room variable is based on value of the button
function getRoomNumber(room) {
  console.log("Room ID: " + room);
  roomInput = room; // the roominput is set as the value of the button
  joinRoom(roomInput)
}

// What are ICE servers?
const iceServers = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
  ],
}

// Request inputted room
connectButton.addEventListener('click', () => {
  getRoomNumber(roomInputTxt.value)
  // joinRoom(roomInput)
})


// New room created
socket.on('room_created', async () => {
  console.log('Socket event callback: room_created')
  await setLocalStream(mediaConstraints)
  isRoomCreator = true
})


// Joining existing room
socket.on('room_joined', async () => {
  console.log('Socket event callback: room_joined')
  await setLocalStream(mediaConstraints)
  socket.emit('start_call', roomId)
})


// Maximum participants for the room id reached
socket.on('full_room', () => {
  console.log('Socket event callback: full_room')
  alert('The room is full, please try another one')
})

// Input validation
function joinRoom(room) {
  if (room === '') {
    alert('Please type a room ID')
  } else {
    roomId = room
    socket.emit('join', room)
    showVideoConference()
  }
}

//hide all sections except header and footer. Allow video to display in a block style
function showVideoConference() {
  for (let el of homepage) el.style = 'display: none'
  for (let el of info) el.style = 'display: none'
  for (let el of join) el.style = 'display: none'
  for (let el of about) el.style = 'display: none'
  // video[0].style = 'display: block'
  videoChatContainer.hidden = false;
}



async function setLocalStream(mediaConstraints) {
  let stream
  try {
    stream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
  } catch (error) {
    console.error('Could not get user media', error)
  }

  localStream = stream
  localVideoComponent.srcObject = stream
}

socket.on("close", async() => {
  removeRemoteStream();
})


// Creating P2P connection
socket.on('start_call', async () => {
  console.log('Socket event callback: start_call')

  if (isRoomCreator) {
    rtcPeerConnection = new RTCPeerConnection(iceServers)
    addLocalTracks(rtcPeerConnection)
    rtcPeerConnection.ontrack = setRemoteStream
    rtcPeerConnection.onicecandidate = sendIceCandidate
    await createOffer(rtcPeerConnection)
  }
})


// Creating P2P connection if not creator
socket.on('webrtc_offer', async (event) => {
  console.log('Socket event callback: webrtc_offer')

  if (!isRoomCreator) {
    rtcPeerConnection = new RTCPeerConnection(iceServers)
    addLocalTracks(rtcPeerConnection)
    rtcPeerConnection.ontrack = setRemoteStream
    rtcPeerConnection.onicecandidate = sendIceCandidate
    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
    await createAnswer(rtcPeerConnection)
  }
})

socket.on('webrtc_answer', (event) => {
  console.log('Socket event callback: webrtc_answer')

  rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
})

socket.on('webrtc_ice_candidate', (event) => {
  console.log('Socket event callback: webrtc_ice_candidate')

  
  var candidate = new RTCIceCandidate({
    sdpMLineIndex: event.label,
    candidate: event.candidate,
  })
  rtcPeerConnection.addIceCandidate(candidate)

  // @ Detect when the second user has disconnected from the room
  rtcPeerConnection.oniceconnectionstatechange = function() {
    if(rtcPeerConnection.iceConnectionState == 'disconnected') {
        console.log('Peer disconnected');
        removeRemoteStream();
        socket.emit("peerDisconnected", roomId);
    }
  }
  //
})

function addLocalTracks(rtcPeerConnection) {
  localStream.getTracks().forEach((track) => {
    rtcPeerConnection.addTrack(track, localStream)
  })
}


async function createOffer(rtcPeerConnection) {
  let sessionDescription
  try {
    sessionDescription = await rtcPeerConnection.createOffer()
    rtcPeerConnection.setLocalDescription(sessionDescription)
  } catch (error) {
    console.error(error)
  }

  socket.emit('webrtc_offer', {
    type: 'webrtc_offer',
    sdp: sessionDescription,
    roomId,
  })
}

async function createAnswer(rtcPeerConnection) {
  let sessionDescription
  try {
    sessionDescription = await rtcPeerConnection.createAnswer()
    rtcPeerConnection.setLocalDescription(sessionDescription)
  } catch (error) {
    console.error(error)
  }

  socket.emit('webrtc_answer', {
    type: 'webrtc_answer',
    sdp: sessionDescription,
    roomId,
  })
}

function setRemoteStream(event) {
  remoteVideoComponent.srcObject = event.streams[0];
  remoteStream = event.stream;
}

// @ When the second peer disconnects, remove their video.
function removeRemoteStream() {
  rtcPeerConnection = new RTCPeerConnection(iceServers);
  remoteVideoComponent.srcObject = null;
  remoteStream = null;
}
//

function sendIceCandidate(event) {
  if (event.candidate) {
    socket.emit('webrtc_ice_candidate', {
      roomId,
      label: event.candidate.sdpMLineIndex,
      candidate: event.candidate.candidate,
    })
  }
}