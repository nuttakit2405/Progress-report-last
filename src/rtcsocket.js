/* eslint-disable */
var localVideo
var remoteVideo
var firstPerson = false
var socketCount = 0
var socketId
var socket
var localStream
var screenStream
var connections = []
var hubId

var peerConnectionConfig = {
  'iceServers': [
    { 'urls': 'stun:stun.services.mozilla.com' },
    { 'urls': 'stun:stun.l.google.com:19302' }
  ]
}

export function closeLocalVideo() {
  socket.disconnect()
  if (!!localStream) {
    localStream.getTracks().forEach(stream => {
      stream.stop()
    })
  }

  if (!!screenStream) {
    screenStream.getTracks().forEach(stream => {
      stream.stop()
    })
  }
}

export function pageReady(groupId) {
  hubId = groupId
  localVideo = document.getElementById('localVideo')
  remoteVideo = document.getElementById('remoteVideo')

  var constraints = {
    video: true,
    audio: true
  }

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        localStream = stream
        getUserMediaSuccess(stream)
      })
      .then(function () {
        socket = io.connect(process.env.PROGRESS_REPORT_SERVICE, {query: 'groupId='+groupId})
        socket.on('signal', gotMessageFromServer)

        socket.on('connect', function () {
          socketId = socket.id

          socket.on('user-left', function (id) {
            var video = document.querySelector('[data-socket="' + id + '"]')
            if (video) {
              var parentDiv = video.parentElement
              video.parentElement.parentElement.removeChild(parentDiv)
            }
          })

          socket.on('user-joined', function (id, count, clients) {
            clients.forEach(function (socketListId) {
              if (!connections[socketListId]) {
                connections[socketListId] = new RTCPeerConnection(peerConnectionConfig)
                // Wait for their ice candidate
                connections[socketListId].onicecandidate = function () {
                  if (event.candidate != null) {
                    socket.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate, groupId }))
                  }
                }

                // Wait for their video stream
                connections[socketListId].onaddstream = function () {
                  gotRemoteStream(event, socketListId)
                }

                // Add the local video stream
                connections[socketListId].addStream(localStream)
              }
            })

            // Create an offer to connect with your local description

            if (count >= 2) {
              connections[id].createOffer().then(function (description) {
                connections[id].setLocalDescription(description).then(function () {
                  // console.log(connections);
                  socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription, groupId }))
                }).catch(e => console.log(e))
              })
            }
          })
        })
      })
  } else {
    alert('Your browser does not support getUserMedia API')
  }
}

function gotRemoteStream(event, id) {
  var videos = document.querySelector('.videos')
  var video = document.createElement('video')
  var div = document.createElement('div')

  video.setAttribute('data-socket', id)
  video.srcObject = event.stream
  video.autoplay = true
  video.muted = true
  video.playsinline = true

  div.appendChild(video)
  videos.insertBefore(div, videos.firstChild)
}

function gotMessageFromServer(fromId, message) {
  // Parse the incoming signal
  var signal = JSON.parse(message)
  var groupId = signal.groupId

  // Make sure it's not coming from yourself
  if (fromId !== socketId && hubId == groupId) {
    if (signal.sdp) {
      connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(function () {
        if (signal.sdp.type == 'offer') {
          connections[fromId].createAnswer().then(function (description) {
            connections[fromId].setLocalDescription(description).then(function () {
              const data = { sdp: connections[fromId].localDescription, groupId }
              socket.emit('signal', fromId, JSON.stringify(data))
            }).catch(e => console.log(e))
          }).catch(e => console.log(e))
        }
      }).catch(e => console.log(e))
    }

    if (signal.ice) {
      connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
    }
  }
}

export function openScreen (onEnded) {
  getScreenId(function (error, sourceId, screen_constraints) {
    console.log({ error, sourceId, screen_constraints })
    navigator.mediaDevices.getUserMedia(screen_constraints).then(function (stream) {
      screenStream = stream
      getUserMediaSuccess(stream)
    }).catch(function (error) {
      console.error(error);
    });
  });
}

function getUserMediaSuccess(stream) {
  localVideo.srcObject = stream
}
