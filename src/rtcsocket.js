/* eslint-disable */
var localVideo
var remoteVideo
var socketCount = 0
var socketId
var socket
var localStream
var reserveStream
var connections = []
var hubId

var peerConnectionConfig = {
  'iceServers': [
    { 'urls': 'stun:stun.services.mozilla.com' },
    { 'urls': 'stun:stun.l.google.com:19302' }
  ]
}

export function muteLocal (state) {
  localStream.getAudioTracks().forEach(stream => {
    stream.enabled = state
    console.log(stream)
  })
  console.log(localStream)
}

export function closeLocalVideo() {
  socket.disconnect()
  stopLocalVideo()
  stopReserveVideo()
}

function stopLocalVideo() {
  if (!!localStream) {
    localStream.getTracks().forEach(stream => {
      stream.stop()
    })
    localStream = null
  }
}

function stopReserveVideo() {
  if (!!reserveStream) {
    reserveStream.getTracks().forEach(stream => {
      stream.stop()
    })
    reserveStream = null
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
        socket = io.connect(process.env.PROGRESS_REPORT_SERVICE, { query: 'groupId=' + groupId })
        socket.on('signal', gotMessageFromServer)
        socket.on('switch', gotMessageSwitchFromServer)

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
                connections[socketListId].onicecandidate = function (event) {
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

function getUserMediaSuccess(stream) {
  localVideo.srcObject = stream
}

function gotRemoteStream(event, id) {
  var videos = document.querySelector('.videos')
  var video = document.createElement('video')
  var div = document.createElement('div')

  video.setAttribute('data-socket', id)
  video.srcObject = event.stream
  video.autoplay = true
  // video.muted = true
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

export function openScreen(onEnded) {
  console.log(connections[socketId])
  getScreenId((error, sourceId, screen_constraints) => {
    console.log({ error, sourceId, screen_constraints })
    navigator.mediaDevices.getUserMedia(screen_constraints)
      .then((stream) => {
        reserveStream = stream

        connections[socketId].removeStream(localStream);
        connections[socketId].addStream(stream);
        connections[socketId].createOffer().then(function (offerSDP) {
          const data = { sdp: offerSDP, groupId: hubId }
          console.log('switch', data)
          socket.emit('switch', socketId, JSON.stringify(data))
        })

        stream.addEventListener('inactive', e => {
          console.log('Capture stream inactive - stop recording!');
          // connections[socketId].removeStream(stream)
          // connections[socketId].addStream(localStream)
          // stopReserveVideo()
          getUserMediaSuccess(localStream)
        });
        getUserMediaSuccess(stream)
      }).catch((error) => {
        console.error(error);
      });
  });
}

function gotRemoteSwitchStream(event, id) {
  remoteVideo.srcObject = event.stream
}

function gotMessageSwitchFromServer(fromId, message) {
  // Parse the incoming signal
  var signal = JSON.parse(message)
  var groupId = signal.groupId

  console.log('answer', { fromId, signal, groupId })

  // // Make sure it's not coming from yourself
  if (fromId !== socketId && hubId == groupId) {
    if (signal.sdp) {
      console.log('switch sdp', signal, connections[fromId])
      connections[fromId].onaddstream = function (event) {
        console.log('onaddstream switch', event)
        // gotRemoteSwitchStream(event)
      };

      connections[fromId].onicecandidate = function (event) {
        console.log('switch onice', event)
        // gotRemoteSwitchStream(event)
      }

      // connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(function () {
      if (signal.sdp.type == 'offer') {
        connections[fromId].createAnswer().then(function (description) {
          connections[fromId].setLocalDescription(description).then(function () {
            // const ata = { sdp: connections[fromId].localDescription, groupId }
            // socket.emit('switch', fromId, JSON.stringify(data))
          }).catch(e => console.log(e))
        }).catch(e => console.log(e))
      }
      // }).catch(e => console.log(e))
    }

    // if (signal.ice) {
    //   connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
    // }
  }
}