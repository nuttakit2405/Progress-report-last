/* eslint-disable */
const drone = new ScaleDrone('OEdmCY1pRjtKWMBM')

// Room name needs to be prefixed with 'observable-'
const configuration = {
  iceServers: [{
    urls: 'stun:stun.l.google.com:19302'
  }]
}

let roomName
let room
let pc
let localVideoSteam
let screenSteam

function onSuccess () { };
function onError (error) {
  console.error(error)
};

export function droneOpen (roomHash) {
  return new Promise((resolve) => {
    roomName = 'observable-' + roomHash
    console.log(roomName)
    drone.on('open', error => {
      if (error) {
        return console.error(error)
      }
      room = drone.subscribe(roomName)
      room.on('open', error => {
        if (error) {
          onError(error)
        }
      })

      // We're connected to the room and received an array of 'members'
      // connected to the room (including us). Signaling server is ready.
      room.on('members', members => {
        console.log('MEMBERS', members)
        // If we are the second user to connect to the room we will be creating the offer
        const isOfferer = members.length === 2
        startWebRTC(isOfferer)
        // startWebRTC(true)
      })

      resolve(true)
    })
  })
}


export function startWebRTC (isOfferer) {
  console.log('startWebRTC')
  pc = new RTCPeerConnection(configuration)

  // 'onicecandidate' notifies us whenever an ICE agent needs to deliver a
  // message to the other peer through the signaling server
  pc.onicecandidate = event => {
    if (event.candidate) {
      sendMessage({ 'candidate': event.candidate })
    }
  }

  // If user is offerer let the 'negotiationneeded' event create the offer
  if (isOfferer) {
    pc.onnegotiationneeded = () => {
      pc.createOffer().then(localDescCreated).catch(onError)
    }
  }

  // When a remote stream arrives display it in the #remoteVideo element
  pc.ontrack = (event) => {
    console.log(event)
    const stream = event.streams[0]
    const remoteVideo = document.getElementById('remoteVideo')
    if (!remoteVideo.srcObject || remoteVideo.srcObject.id !== stream.id) {
      remoteVideo.srcObject = stream
    }
  }

  // Listen to signaling data from Scaledrone
  room.on('data', (message, client) => {
    // Message was sent by us
    if (client.id === drone.clientId) {
      return
    }

    if (message.sdp) {
      // This is called after receiving an offer or answer from another peer
      pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
        // When receiving an offer lets answer it
        if (pc.remoteDescription.type === 'offer') {
          pc.createAnswer().then(localDescCreated).catch(onError)
        }
      }, onError)
    } else if (message.candidate) {
      // Add the new ICE candidate to our connections remote description
      pc.addIceCandidate(
        new RTCIceCandidate(message.candidate), onSuccess, onError
      )
    }
  })

  openLocalVideo(true, true)
}

function localDescCreated (desc) {
  pc.setLocalDescription(
    desc,
    () => sendMessage({ 'sdp': pc.localDescription }),
    onError
  )
}

export function openLocalVideo (video, audio) {
  return navigator.mediaDevices.getUserMedia({
    video: video,
    audio: audio
  }).then(stream => {
    // Display your local video in #localVideo element
    const localVideo = document.getElementById('localVideo')
    localVideo.srcObject = stream
    localVideoSteam = stream

    // Add your stream to be sent to the conneting peer
    stream.getTracks().forEach(track => pc.addTrack(track, stream))
  }, onError)
}

export function startSteamLocal () {
  console.log('startSteam')
  return new Promise((resolve) => {
    console.log({pc, localVideoSteam})
      localVideoSteam.getTracks().forEach(track => pc.addTrack(track, localVideoSteam))
    resolve(true)
  })
}

export function closeLocalVideo () {
  console.log('destroy')
  if (localVideoSteam) {
    localVideoSteam.getTracks().forEach(track => track.stop())
  }
  if (screenSteam) {
    screenSteam.getTracks().forEach(track => track.stop())
  }
}

export function openScreen (onEnded) {
  getScreenId(function (error, sourceId, screen_constraints) {
    console.log({ error, sourceId })
    navigator.mediaDevices.getUserMedia(screen_constraints).then(function (stream) {
      const localVideo = document.getElementById('screen')
      localVideo.srcObject = stream
      screenSteam = stream
      stream.getTracks().forEach(track => {
        track.onended = () => {
          onEnded()
          screenSteam.getTracks().forEach(track => track.stop())
        }
      })
    }).catch(function (error) {
      console.error(error);
    });
  });
}

// Send signaling data via Scaledrone
export function sendMessage (message) {
  drone.publish({
    room: roomName,
    message
  })
}