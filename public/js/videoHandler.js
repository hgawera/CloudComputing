// Group Project 2021 UG6
//
// The code in this file is based off the tutorial hosted on acidtango.com.
// https://acidtango.com/thelemoncrunch/how-to-implement-a-video-conference-with-webrtc-and-node/
//
// Code added by students in UG6 for the Cloud Computing module is included near the start of the document.
// This is indicated by a line of asterisks.
// 

const roomSelectionContainer = document.getElementById('room-selection-container')
const roomInputTxt = document.getElementById('room-input')
const videoChatContainer = document.getElementById('video-chat-container')
const localVideoComponent = document.getElementById('local-video')
const remoteVideoComponent = document.getElementById('remote-video')
const connectButton = document.getElementById('connect-button')
const homepage = document.getElementsByClassName('homepage')
const info = document.getElementsByClassName('info')
const join = document.getElementsByClassName('join')
const about = document.getElementsByClassName('about bg-primary my-2 py-2')
const video = document.getElementsByClassName('video')

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

// These ice servers are used to determine the public IP of the client machine.
const iceServers = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
  ],
}


// *************************************
// Start of code added by us for Cloud Computing 


// Checking to see if a roomID has been selected on the homepage.
// If it has, trigger the start meeting code.
if (String(sessionStorage.getItem("roomID")) != "null"){
  joinRoom(sessionStorage.getItem("roomID"));
  sessionStorage.setItem("roomID", "null");
}
//

// Hide all sections except header and footer. Allow video to display.
function showVideoConference() {
  for (let el of homepage) el.style = 'display: none'
  for (let el of info) el.style = 'display: none'
  for (let el of join) el.style = 'display: none'
  for (let el of about) el.style = 'display: none'
  videoChatContainer.hidden = false;
}

// When the second peer disconnects, remove their video.
function removeRemoteStream() {
  console.log("Removing peer connection");
  rtcPeerConnection = new RTCPeerConnection(iceServers);
  remoteVideoComponent.srcObject = null;
  remoteStream = null;
}

// When close message received from the server, close the connection
socket.on("close", async() => {
  console.log("Received notification to close connection");
  removeRemoteStream();
})

// Detect when the second user has disconnected from the room
function detectDisconnection(){
  rtcPeerConnection.oniceconnectionstatechange = function() {
    if(rtcPeerConnection.iceConnectionState == 'disconnected') {
        console.log('Peer disconnected');
        removeRemoteStream();
        socket.emit("peerDisconnected", roomId);
    }
  }
}

// ******************************************
// End of code added by us for Cloud Computing 




// Start connection when button clicked
connectButton.addEventListener('click', () => {
  joinRoom(roomInputTxt.value)
})

// Listening for socket events
socket.on('room_created', async () => {
  console.log('Socket event callback: room_created')
  await setLocalStream(mediaConstraints)
  isRoomCreator = true
})
socket.on('room_joined', async () => {
  console.log('Socket event callback: room_joined')
  await setLocalStream(mediaConstraints)
  socket.emit('start_call', roomId)
})
socket.on('full_room', () => {
  console.log('Socket event callback: full_room')
  alert('The room is full, please try another one')
})
socket.on('start_call', async () => {
  console.log('Socket event callback: start_call')
  if (isRoomCreator) {
    rtcPeerConnection = new RTCPeerConnection(iceServers)
    detectDisconnection();
    addLocalTracks(rtcPeerConnection)
    rtcPeerConnection.ontrack = setRemoteStream
    rtcPeerConnection.onicecandidate = sendIceCandidate
    await createOffer(rtcPeerConnection)
  }
})
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
})


// Input validation
function joinRoom(room) {
  removeRemoteStream();
  if (room === '') {
    alert('Please type a room ID')
  } else {
    console.log("Room ID: " + room);
    roomId = room
    socket.emit('join', room)
    showVideoConference()
  }
}

// WebRTC Functions
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
function sendIceCandidate(event) {
  if (event.candidate) {
    socket.emit('webrtc_ice_candidate', {
      roomId,
      label: event.candidate.sdpMLineIndex,
      candidate: event.candidate.candidate,
    })
  }
}